import { supabase } from '../lib/supabase';
import { BlockchainService } from './blockchainService';
import { NotificationService } from './notificationService';
import { PriceService } from './priceService';

interface SurplusWindow {
    id: string;
    producer_id: string;
    date: string;
    start_time: string;
    end_time: string;
    predicted_kw: number;
    available_kw: number;
    status: string;
}

interface ConsumerProfile {
    id: string;
    state_location: string;
    flexible_load_kw: number;
    shiftable_hours: string[]; // e.g. ["09:00", "10:00", "11:00"]
}

export async function detectOverlaps(windowId: string) {
    console.log(`[MatchingEngine] Starting overlap detection for window: ${windowId}`);

    // 1. Fetch the surplus window details with producer source info
    const { data: window, error: windowError } = await supabase
        .from('surplus_windows')
        .select('*, producer:producer_id(state_location, energy_source)')
        .eq('id', windowId)
        .single();

    if (windowError || !window) {
        console.error('[MatchingEngine] Error fetching window:', windowError);
        return;
    }

    const energySource = (window.producer as any).energy_source || 'Solar';
    const carbonMultiplier = energySource === 'Wind' ? 0.81 : (energySource === 'Solar' ? 0.78 : 0.75);

    // 1.5 Initialize available_kw if null or undefined
    let currentAvailable = window.available_kw;
    if (currentAvailable === null || currentAvailable === undefined) {
        console.log('[MatchingEngine] available_kw was null, initializing with predicted_kw');
        currentAvailable = window.predicted_kw;
        
        await supabase
            .from('surplus_windows')
            .update({ available_kw: currentAvailable })
            .eq('id', window.id);
    }

    if (currentAvailable <= 0 || window.status === 'expired') {
        console.log('[MatchingEngine] Window is not available for matching.');
        return;
    }

    const producerLocation = (window.producer as any).state_location;

    // 2. Fetch potential consumers in the same location
    const { data: consumers, error: consumersError } = await supabase
        .from('profiles')
        .select('id, state_location, flexible_load_kw, shiftable_hours')
        .eq('role', 'consumer')
        .eq('state_location', producerLocation);

    if (consumersError) {
        console.error('[MatchingEngine] Error fetching consumers:', consumersError);
        return;
    }

    console.log(`[MatchingEngine] Found ${consumers?.length} potential consumers in ${producerLocation}`);

    for (const consumer of consumers as ConsumerProfile[]) {
        if (currentAvailable <= 0) break;

        // Normalize times to HH:mm for reliable string comparison
        const winStart = window.start_time.substring(0, 5);
        const winEnd = window.end_time.substring(0, 5);

        const isTimeMatch = consumer.shiftable_hours.some(hour => {
            const h = hour.substring(0, 5);
            return h >= winStart && h < winEnd;
        });

        if (isTimeMatch) {
            console.log(`[MatchingEngine] Match found! Consumer: ${consumer.id} (Source: ${energySource})`);

            const matchedKw = Math.min(currentAvailable, consumer.flexible_load_kw);
            
            // 💰 LIVE PRICING: Fetch real-time grid rate for the region
            const gridRate = await PriceService.getGridPrice(producerLocation);
            const surplusRate = Number(window.price_per_kw) || 4.0;
            
            const savings = matchedKw * (gridRate - surplusRate);
            const revenue = matchedKw * surplusRate;
            const carbonOffset = matchedKw * carbonMultiplier;
            
            console.log(`💰 PRICING DEBUG: Grid=${gridRate}, Surplus=${surplusRate}, SavingsPerKw=${gridRate - surplusRate}`);
            console.log(`🌿 SUSTAINABILITY DEBUG: Source=${energySource}, Offset=${carbonOffset.toFixed(2)} kg`);

            // 4. Create the match record
            const { data: newMatch, error: matchError } = await supabase
                .from('matches')
                .insert({
                    window_id: window.id,
                    consumer_id: consumer.id,
                    matched_kw: matchedKw,
                    consumer_savings_inr: savings,
                    producer_revenue_inr: revenue,
                    status: 'pending',
                    confidence_score: 'High',
                    carbon_offset_kg: carbonOffset
                })
                .select()
                .single();

            if (matchError) {
                console.error('[MatchingEngine] Error creating match:', matchError);
                continue;
            }

            // 📢 NOTIFICATION TRIGGER: Alert the consumer immediately
            await NotificationService.notifyNewMatch(consumer.id, matchedKw, savings);

            // 5. Update window availability
            currentAvailable = currentAvailable - matchedKw;
            
            // Temporary update inside loop
            await supabase
                .from('surplus_windows')
                .update({ available_kw: currentAvailable })
                .eq('id', window.id);
                
            console.log(`[MatchingEngine] Match recorded, Remaining: ${currentAvailable}kW`);
        }
    }

    // FINAL SYNC: Ensure the final status is accurately reflected after checking all consumers
    const finalStatus = currentAvailable <= 0 
        ? 'matched' 
        : (currentAvailable < window.predicted_kw ? 'partial' : 'seeking');

    await supabase
        .from('surplus_windows')
        .update({ 
            status: finalStatus,
            available_kw: currentAvailable 
        })
        .eq('id', window.id);

    console.log(`[MatchingEngine] Final automation sync: Window status set to '${finalStatus}'`);
    console.log(`[MatchingEngine] Finished matching for window: ${windowId}`);
}

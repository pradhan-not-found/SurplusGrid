import { supabase } from './lib/supabase';
import { detectOverlaps } from './services/matchingEngine';

async function seed() {
    console.log('🌱 Starting Seed Process...');

    try {
        // 1. Create a Producer User & Profile
        const { data: producerUser, error: pUserError } = await supabase.auth.admin.createUser({
            email: `producer_${Date.now()}@test.com`,
            password: 'password123',
            email_confirm: true,
            user_metadata: { full_name: 'Test Producer Corp', role: 'producer' }
        });

        if (pUserError) throw pUserError;
        const producerId = producerUser.user.id;
        console.log(`✅ Producer created: ${producerId}`);

        // Update profile details (capacity, location)
        await supabase.from('profiles').update({
            state_location: 'Maharashtra',
            capacity_mw: 50,
            onboarding_complete: true
        }).eq('id', producerId);

        // 2. Create a Consumer User & Profile
        const { data: consumerUser, error: cUserError } = await supabase.auth.admin.createUser({
            email: `consumer_${Date.now()}@test.com`,
            password: 'password123',
            email_confirm: true,
            user_metadata: { full_name: 'Green Factory LLC', role: 'consumer' }
        });

        if (cUserError) throw cUserError;
        const consumerId = consumerUser.user.id;
        console.log(`✅ Consumer created: ${consumerId}`);

        // Update consumer profile (location, flexible load, shiftable hours)
        await supabase.from('profiles').update({
            state_location: 'Maharashtra',
            flexible_load_kw: 100,
            shiftable_hours: ['09:00', '10:00', '11:00', '12:00'],
            onboarding_complete: true
        }).eq('id', consumerId);

        // 3. Create a Surplus Window for the Producer
        const today = new Date().toISOString().split('T')[0];
        const { data: window, error: windowError } = await supabase.from('surplus_windows').insert({
            producer_id: producerId,
            date: today,
            start_time: '10:00:00',
            end_time: '14:00:00',
            predicted_kw: 500,
            available_kw: 500,
            status: 'seeking'
        }).select().single();

        if (windowError) throw windowError;
        console.log(`✅ Surplus Window created: ${window.id} (10:00 AM - 2:00 PM)`);

        // 4. Trigger the Matching Engine
        console.log('⚙️ Triggering Matching Engine...');
        await detectOverlaps(window.id);

        // 5. Verify the Match
        const { data: matches, error: matchesError } = await supabase
            .from('matches')
            .select('*')
            .eq('window_id', window.id);

        if (matchesError) throw matchesError;

        if (matches && matches.length > 0) {
            console.log('🎉 SUCCESS! Match found and recorded in database:');
            console.table(matches.map(m => ({
                consumer_id: m.consumer_id,
                matched_kw: m.matched_kw,
                savings: m.consumer_savings_inr,
                status: m.status
            })));
        } else {
            console.log('❌ No match found. Check logic or time overlaps.');
        }

    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
}

seed();

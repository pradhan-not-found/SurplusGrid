import { detectOverlaps } from './src/services/matchingEngine.js';
import { supabase } from './src/lib/supabase.js';
import dotenv from 'dotenv';
dotenv.config();

async function runManualMatch() {
    console.log('🚀 Manual Matching Engine Start...');
    
    // 1. Get the latest window
    const { data: window } = await supabase
        .from('surplus_windows')
        .select('id, date')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!window) {
        console.error('❌ No windows found. Please create a surplus window first.');
        return;
    }

    console.log(`🔍 Processing Window: ${window.id} (${window.date})`);

    // 2. Run the engine directly (avoiding HTTP issues)
    try {
        await detectOverlaps(window.id);
        console.log('✅ Matching process complete! Check your Consumer Dashboard bell icon.');
    } catch (err) {
        console.error('❌ Engine Error:', err);
    }
}

runManualMatch();

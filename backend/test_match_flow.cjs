const dotenv = require('dotenv');
const path = require('path');
const { execSync } = require('child_process');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function runFullVerification() {
    const producerId = '0b11c85a-e726-4526-bf29-1b1d816f4286'; // Test Producer Corp
    const consumerId = '4aa02e71-a2fa-4ff4-8f4e-0eeda28bf6c3'; // Green Factory LLC
    const baseUrl = `${process.env.SUPABASE_URL}/rest/v1`;
    const headers = {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };

    console.log('🌍 Step 0: Ensuring Maharashtra overlap...');
    // Sync both accounts to Maharashtra for the demo
    await fetch(`${baseUrl}/profiles?id=eq.${producerId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ state_location: 'Maharashtra' })
    });
    await fetch(`${baseUrl}/profiles?id=eq.${consumerId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ state_location: 'Maharashtra' })
    });

    console.log('🌱 Step 1: Creating a NEW Surplus Window for Test Producer Corp...');
    const winResponse = await fetch(`${baseUrl}/surplus_windows`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            producer_id: producerId,
            date: new Date().toISOString().split('T')[0],
            start_time: '00:00:00',
            end_time: '23:59:59',
            predicted_kw: 650,
            available_kw: 650,
            status: 'seeking'
        })
    });
    
    const windowData = await winResponse.json();
    const window = windowData[0];
    
    if (!window) {
        console.error('❌ Failed to create window:', windowData);
        return;
    }
    console.log('✅ Window Created:', window.id);

    console.log('⚙️ Step 2: Running Matching Engine between Test Producer Corp and Green Factory...');
    try {
        const command = `npx tsx -e "import { detectOverlaps } from './src/services/matchingEngine'; detectOverlaps('${window.id}').then(() => process.exit())"`;
        execSync(command, { stdio: 'inherit' });
        console.log('\n✅ Demo Complete! Check your Green Factory LLC Dashboard! 🔔');
    } catch (err) {
        console.error('❌ Engine Error:', err.message);
    }
}

runFullVerification();

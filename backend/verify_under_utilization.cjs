const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function runUnderUtilizationTest() {
    const producerId = '0b11c85a-e726-4526-bf29-1b1d816f4286'; // Test Producer Corp
    const baseUrl = `${process.env.SUPABASE_URL}/rest/v1`;
    const headers = {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };

    console.log('🌱 Step 1: Creating an UNSOLD Surplus Window...');
    const winResponse = await fetch(`${baseUrl}/surplus_windows`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            producer_id: producerId,
            date: new Date().toISOString().split('T')[0],
            start_time: '20:00:00',
            end_time: '22:00:00',
            predicted_kw: 800,
            available_kw: 800, // 100% UNSOLD
            status: 'seeking'
        })
    });
    
    const [window] = await winResponse.json();
    console.log('✅ Window Created:', window.id);

    console.log('⚙️ Step 2: Triggering Optimization Scan...');
    const scanResponse = await fetch('http://localhost:5001/api/trigger-optimization', {
        method: 'POST'
    });
    
    if (scanResponse.ok) {
        console.log('\n✅ Optimization Complete! The system detected the waste.');
        console.log('🏁 Check your Producer Dashboard bell for the ⚠️ Optimization alert!');
    } else {
        console.error('❌ Failed to trigger scan. Ensure backend is running.');
    }
}

runUnderUtilizationTest();

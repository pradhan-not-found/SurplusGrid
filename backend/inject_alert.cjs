const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function injectCrisisAlert() {
    const producerId = '0b11c85a-e726-4526-bf29-1b1d816f4286'; // Test Producer Corp
    const url = `${process.env.SUPABASE_URL}/rest/v1/notifications`;
    
    console.log('🛑 Dispatching Grid Curtailment Alert...');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: producerId,
            title: '🛑 Grid Curtailment Warning',
            message: 'CRITICAL: High congestion detected in the Maharashtra grid. Reduce generation immediately to avoid utility penalties.',
            type: 'system',
            is_read: false
        })
    });

    if (response.ok) {
        console.log('✅ Success! Check your Producer Dashboard bell icon.');
    } else {
        const err = await response.json();
        console.error('❌ Failed:', err);
    }
}

injectCrisisAlert();

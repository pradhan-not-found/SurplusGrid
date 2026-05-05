const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function triggerTestNotification() {
    const userId = '4aa02e71-a2fa-4ff4-8f4e-0eeda28bf6c3'; // Green Factory LLC
    const url = `${process.env.SUPABASE_URL}/rest/v1/notifications`;
    
    console.log('🚀 Triggering real-time notification for user:', userId);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
            user_id: userId,
            title: '⚡ Engine Verified',
            message: 'Your real-time notification engine is now 100% active and verified!',
            type: 'match',
            is_read: false,
            created_at: new Date().toISOString()
        })
    });

    if (response.ok) {
        console.log('✅ Success! Check your dashboard bell icon.');
    } else {
        const err = await response.text();
        console.error('❌ Failed:', err);
    }
}

triggerTestNotification();

const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function checkNotifications() {
    const userId = '4aa02e71-a2fa-4ff4-8f4e-0eeda28bf6c3';
    const url = `${process.env.SUPABASE_URL}/rest/v1/notifications?user_id=eq.${userId}&is_read=eq.false&select=*`;
    
    const response = await fetch(url, {
        headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
    });

    const data = await response.json();
    console.log('--- DATABASE CHECK ---');
    console.log('Unread Notifications found in DB:', data.length);
    if (data.length > 0) {
        data.forEach((n, i) => {
            console.log(`${i + 1}. [${n.title}] - ${n.created_at}`);
        });
    }
}

checkNotifications();

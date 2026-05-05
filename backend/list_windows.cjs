const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function listLatestWindows() {
    const url = `${process.env.SUPABASE_URL}/rest/v1/surplus_windows?select=id,date,start_time&order=created_at.desc&limit=5`;
    
    console.log('🔍 Fetching your latest Surplus Windows...');

    const response = await fetch(url, {
        headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
    });

    const data = await response.json();
    console.log('\n--- LATEST WINDOWS ---');
    if (data.length === 0) {
        console.log('No windows found. Create one in the Producer Dashboard first!');
    } else {
        data.forEach((win, i) => {
            console.log(`${i + 1}. ID: ${win.id} | Date: ${win.date} | Start: ${win.start_time}`);
        });
    }
}

listLatestWindows();

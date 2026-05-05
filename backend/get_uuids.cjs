const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function getUUIDs() {
    const url = `${process.env.SUPABASE_URL}/rest/v1/profiles?select=id,full_name,role`;
    const response = await fetch(url, {
        headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

getUUIDs();

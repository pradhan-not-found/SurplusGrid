import { supabase } from './lib/supabase';

async function checkSchema() {
    // 1. Check if table exists
    const { data: tables, error: tablesError } = await supabase
        .from('surplus_windows')
        .select('*')
        .limit(0);

    if (tablesError) {
        console.log('❌ Error: Could not even access the "surplus_windows" table.');
        console.log('Details:', tablesError.message);
        return;
    }

    // 2. Check column
    const { error: columnError } = await supabase
        .from('surplus_windows')
        .select('available_kw')
        .limit(0);

    if (columnError) {
        console.log('❌ Table exists, but "available_kw" is MISSING.');
    } else {
        console.log('✅ Success: Both table and "available_kw" column exist.');
    }
}

checkSchema();

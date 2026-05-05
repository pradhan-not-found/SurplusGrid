import { supabase } from '../lib/supabase';

export class ExpiryService {
    /**
     * Scans for windows that have passed their end time and mark them as expired.
     */
    static async cleanExpiredWindows() {
        console.log('🕒 ExpiryService: Scanning for outdated windows...');

        const now = new Date();
        const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const currentTime = now.toTimeString().split(' ')[0]; // HH:MM:SS

        try {
            // 1. Mark windows that are on past dates
            const { data: pastDateWindows, error: dateError } = await supabase
                .from('surplus_windows')
                .update({ status: 'expired' })
                .eq('status', 'seeking')
                .lt('date', currentDate)
                .select();

            // 2. Mark windows on the current date that have passed their end time
            const { data: pastTimeWindows, error: timeError } = await supabase
                .from('surplus_windows')
                .update({ status: 'expired' })
                .eq('status', 'seeking')
                .eq('date', currentDate)
                .lt('end_time', currentTime)
                .select();

            if (dateError || timeError) {
                console.error('❌ ExpiryService Error:', dateError || timeError);
                return;
            }

            const totalExpired = (pastDateWindows?.length || 0) + (pastTimeWindows?.length || 0);
            if (totalExpired > 0) {
                console.log(`🧹 ExpiryService: Cleaned up ${totalExpired} expired windows.`);
            }
        } catch (error) {
            console.error('❌ ExpiryService: Unexpected failure:', error);
        }
    }

    /**
     * Starts the janitor task to run every 60 seconds.
     */
    static start() {
        console.log('🚀 ExpiryService: Background janitor started.');
        // Initial run
        this.cleanExpiredWindows();
        // Periodic run (every 60 seconds)
        setInterval(() => this.cleanExpiredWindows(), 60000);
    }
}

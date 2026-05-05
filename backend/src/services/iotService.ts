import { supabase } from '../lib/supabase';

export class IotService {
    /**
     * Scans for matches that are starting NOW and triggers their IoT devices.
     */
    static async processIotTriggers() {
        console.log('🔌 IotService: Scanning for active load-shift windows...');

        const now = new Date();
        const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const currentTime = now.toTimeString().split(' ')[0]; // HH:MM:SS

        try {
            // 1. Fetch matches that are LOCKED and starting NOW
            // We join with surplus_windows to get the time
            const { data: activeMatches, error } = await supabase
                .from('matches')
                .select(`
                    *,
                    surplus_windows!inner(date, start_time, end_time)
                `)
                .eq('contract_status', 'LOCKED')
                .eq('iot_status', 'idle')
                .eq('surplus_windows.date', currentDate)
                .lte('surplus_windows.start_time', currentTime);

            if (error) {
                console.error('❌ IotService Error:', error.message);
                return;
            }

            if (!activeMatches || activeMatches.length === 0) return;

            for (const match of activeMatches) {
                console.log(`🤖 IotService: Triggering Device for Match ${match.id} (Load Shift Active)`);
                
                // SIMULATION: Sending signal to IoT Device
                // In a real app, you would fetch the consumer's Webhook URL 
                // and send a POST request like: fetch(match.consumer.webhook_url, { ... })
                
                // Update match as triggered
                await supabase
                    .from('matches')
                    .update({ iot_status: 'TRIGGERED' })
                    .eq('id', match.id);
                
                console.log(`✅ IotService: Match ${match.id} IoT SIGNAL SENT!`);
            }

        } catch (error) {
            console.error('❌ IotService: Unexpected failure:', error);
        }
    }

    /**
     * Starts the IoT trigger task to run every 30 seconds.
     */
    static start() {
        console.log('🚀 IotService: Hardware trigger engine started.');
        // Periodic run (every 30 seconds for faster demo feedback)
        setInterval(() => this.processIotTriggers(), 30000);
    }
}

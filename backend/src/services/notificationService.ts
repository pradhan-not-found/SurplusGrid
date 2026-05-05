import { supabase } from '../lib/supabase';

export class NotificationService {
    /**
     * Sends a notification to a specific user.
     * In a production environment, this would also trigger Twilio (SMS) or SendGrid (Email).
     */
    static async send(userId: string, title: string, message: string, type: 'match' | 'expiry' | 'iot' = 'match') {
        console.log(`🔔 Notification sent to ${userId}: [${title}] ${message}`);

        try {
            // 1. Create In-App Notification
            const { error } = await supabase.from('notifications').insert({
                user_id: userId,
                title,
                message,
                type,
                is_read: false,
                created_at: new Date().toISOString()
            });

            if (error) throw error;

            // 2. Simulate External Communication (SMS/Email)
            console.log('\n--- 📲 EXTERNAL COMMUNICATION BRIDGE ---');
            console.log(`[SMS]   To: +91-XXXXX-XXXX | Msg: ${message}`);
            console.log(`[EMAIL] To: ${userId}@surplusgrid.com | Subject: ${title}`);
            console.log(`[STATUS] DISPATCHED via SurplusGrid Gateway v1.0`);
            console.log('----------------------------------------\n');
            
            return true;
        } catch (error) {
            console.error('❌ NotificationService Error:', error);
            return false;
        }
    }

    /**
     * Notifies a consumer about a new energy match opportunity.
     */
    static async notifyNewMatch(consumerId: string, kw: number, savings: number) {
        return this.send(
            consumerId,
            '⚡ New Surplus Opportunity!',
            `A high-confidence match found: ${kw} kW available. Estimated savings: ₹${savings.toLocaleString()}.`,
            'match'
        );
    }
}

import { supabase } from '../lib/supabase';

export class ReportService {
    /**
     * Aggregates match data for all users to generate weekly summaries.
     */
    static async generateAllReports() {
        console.log('📊 ReportService: Aggregating analytics for all users...');

        try {
            // 1. Get all active users
            const { data: users } = await supabase.from('profiles').select('id');
            if (!users) return;

            for (const user of users) {
                await this.generateUserReport(user.id);
            }

            console.log('✅ ReportService: All reports updated successfully.');
        } catch (error) {
            console.error('❌ ReportService: Aggregation failed:', error);
        }
    }

    private static async generateUserReport(userId: string) {
        // Fetch matches from the last 30 days for this user
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: matches } = await supabase
            .from('matches')
            .select(`
                *,
                surplus_windows(start_time)
            `)
            .or(`consumer_id.eq.${userId},window_id.in.(select id from surplus_windows where producer_id.eq.${userId})`)
            .gte('created_at', thirtyDaysAgo.toISOString());

        if (!matches || matches.length === 0) return;

        // Calculate Totals
        const totals = matches.reduce((acc, m) => ({
            kw: acc.kw + (m.matched_kw || 0),
            revenue: acc.revenue + (m.producer_revenue_inr || 0),
            savings: acc.savings + (m.consumer_savings_inr || 0),
            carbon: acc.carbon + (m.carbon_offset_kg || 0)
        }), { kw: 0, revenue: 0, savings: 0, carbon: 0 });

        // Calculate Heatmap (matches per hour)
        const heatmap: Record<number, number> = {};
        matches.forEach(m => {
            const hour = parseInt(m.surplus_windows?.start_time?.split(':')[0] || '0');
            heatmap[hour] = (heatmap[hour] || 0) + 1;
        });

        // Save to reports table
        await supabase.from('reports').upsert({
            user_id: userId,
            report_type: 'monthly_summary',
            total_kw: totals.kw,
            total_revenue_inr: totals.revenue,
            total_savings_inr: totals.savings,
            total_carbon_offset_kg: totals.carbon,
            heatmap_data: heatmap
        }, { onConflict: 'user_id,report_type' });
    }

    /**
     * Starts the reporting task to run every hour.
     */
    static start() {
        console.log('🚀 ReportService: Analytics aggregator started.');
        // Initial run
        this.generateAllReports();
        // Periodic run (every hour)
        setInterval(() => this.generateAllReports(), 3600000);
    }
}

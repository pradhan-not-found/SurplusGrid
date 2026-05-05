import { supabase } from '../lib/supabase';
import { NotificationService } from './notificationService';

export class OptimizationService {
    /**
     * Scans for windows that are starting soon but have unsold capacity.
     */
    static async checkUnderUtilization() {
        console.log('🔍 [OptimizationService] Scanning for under-utilized windows...');
        
        const { data: windows, error } = await supabase
            .from('surplus_windows')
            .select('*')
            .eq('status', 'seeking')
            .gt('available_kw', 50); // Only care if there's significant energy left

        if (error || !windows) return;

        for (const window of windows) {
            const unsoldPercent = (window.available_kw / window.predicted_kw) * 100;
            
            if (unsoldPercent > 30) {
                console.log(`⚠️ [OptimizationService] Window ${window.id} is under-utilized (${unsoldPercent.toFixed(0)}% left).`);
                
                await NotificationService.send(
                    window.producer_id,
                    '⚠️ Optimization: Under-Utilized Window',
                    `Your window starting at ${window.start_time} still has ${window.available_kw}kW unsold. Consider lowering your price to attract more consumers.`,
                    'system'
                );
            }
        }
    }

    /**
     * Simulates a Grid Curtailment event for a specific region.
     */
    static async triggerCurtailmentAlert(stateLocation: string) {
        console.log(`🛑 [OptimizationService] TRIGGERING GRID CURTAILMENT for ${stateLocation}`);
        
        // Find all producers in that location
        const { data: producers } = await supabase
            .from('profiles')
            .select('id')
            .eq('role', 'producer')
            .eq('state_location', stateLocation);

        if (!producers) return;

        for (const p of producers) {
            await NotificationService.send(
                p.id,
                '🛑 Grid Curtailment Warning',
                `High congestion detected in the ${stateLocation} grid. Reduce generation or increase local consumption to avoid utility penalties.`,
                'system'
            );
        }
    }
}

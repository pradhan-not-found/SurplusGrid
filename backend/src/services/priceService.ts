export class PriceService {
    /**
     * Fetches grid price with real-time volatility.
     * Simulates a live data feed from an Energy Exchange.
     */
    static async getGridPrice(location: string): Promise<number> {
        const now = new Date();
        const hour = now.getHours();
        
        // 1. Base Region Rate
        let basePrice = 8.5; 
        if (location === 'West Bengal') basePrice = 7.8;
        if (location === 'Karnataka') basePrice = 9.2;

        // 2. Time-of-Use Multiplier
        let multiplier = 1.0;
        if (hour >= 18 && hour <= 22) multiplier = 1.5; // Peak
        else if (hour >= 0 && hour <= 6) multiplier = 0.7; // Off-peak

        // 3. ⚡ MARKET VOLATILITY (The "Live" Factor)
        // Adds a random fluctuation of +/- 5% to simulate live trading noise
        const volatility = (Math.random() * 0.1) - 0.05; 
        const finalPrice = basePrice * multiplier * (1 + volatility);

        return Number(finalPrice.toFixed(2));
    }

    static getMarketStatus() {
        const hour = new Date().getHours();
        if (hour >= 18 && hour <= 22) return { status: 'PEAK', color: '#EF4444', trend: 'UP' };
        if (hour >= 0 && hour <= 6) return { status: 'OFF-PEAK', color: '#10B981', trend: 'DOWN' };
        return { status: 'STANDARD', color: '#3B82F6', trend: 'STABLE' };
    }
}

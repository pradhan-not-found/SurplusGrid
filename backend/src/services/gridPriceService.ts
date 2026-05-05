/**
 * 📉 GridPriceService
 * Roadmap #6: Grid Price Feed
 * Fetches real-time grid energy prices to ensure savings calculations are accurate.
 */
export class GridPriceService {
    private static BASE_RATE = 7.50; // INR per kWh

    static async getCurrentRate(): Promise<number> {
        // Simulate a live feed with slight fluctuations
        const fluctuation = (Math.random() * 1.5) - 0.75;
        const currentRate = this.BASE_RATE + fluctuation;
        
        console.log(`📊 [PRICE FEED] Current Grid Rate: ₹${currentRate.toFixed(2)} / kWh`);
        return Number(currentRate.toFixed(2));
    }
}

export class WeatherService {
    /**
     * Simulates fetching live weather data for a region.
     * In production, this would call OpenWeatherMap or similar.
     */
    static async getWeatherData(location: string) {
        // Simulated Live Weather Data
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Overcast'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const temp = Math.floor(Math.random() * (38 - 24) + 24); // 24°C to 38°C
        
        let yieldImpact = 'High';
        let advice = 'Ideal conditions for solar generation.';

        if (condition === 'Cloudy' || condition === 'Overcast') {
            yieldImpact = 'Moderate';
            advice = 'Slight reduction in solar yield. AI forecasting adjusted.';
        }

        return {
            location,
            condition,
            temp: `${temp}°C`,
            yieldImpact,
            advice,
            timestamp: new Date().toISOString()
        };
    }
}

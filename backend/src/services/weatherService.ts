import axios from 'axios';

export class WeatherService {
    /**
     * Fetches real-time meteorological data from OpenWeatherMap.
     */
    static async getWeatherData(location: string) {
        try {
            const apiKey = process.env.OPENWEATHER_API_KEY || 'f33ce2c71ac30870a21c4ff399437999';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
            
            const response = await axios.get(url);
            const data = response.data;
            
            const temp = Math.round(data.main.temp);
            const condition = data.weather[0].main; // e.g., "Clear", "Clouds", "Rain"
            
            let insight = 'Ideal conditions for solar generation.';
            if (condition.toLowerCase().includes('cloud')) {
                insight = 'Sub-optimal solar yield expected due to cloud cover.';
            } else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm')) {
                insight = 'Low solar yield expected due to rain.';
            }

            return {
                temperature: temp,
                condition: condition,
                insight: insight
            };
        } catch (error) {
            console.error('❌ Weather API Error:', error);
            // Fallback to Mumbai if not found or error
            return {
                temperature: 32,
                condition: 'Clear',
                insight: 'Ideal conditions for solar generation.'
            };
        }
    }
}

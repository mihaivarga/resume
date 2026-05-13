import { Injectable } from '@angular/core';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  label: string;
  emoji: string;
  colors: [string, string, string];
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  async getWeather(): Promise<WeatherData | null> {
    try {
      const { latitude, longitude } = await this.getCoords();
      const [weatherRes, geoRes] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,is_day,temperature_2m`),
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
      ]);
      const [weatherData, geoData] = await Promise.all([weatherRes.json(), geoRes.json()]);

      const code: number = weatherData.current.weather_code;
      const isDay: boolean = weatherData.current.is_day === 1;
      const temperature: number = Math.round(weatherData.current.temperature_2m);
      const addr = geoData.address ?? {};
      const city: string = addr.city ?? addr.town ?? addr.village ?? addr.county ?? '';
      const country: string = (addr.country_code as string ?? '').toUpperCase();

      return { city, country, temperature, ...this.interpret(code, isDay) };
    } catch {
      return null;
    }
  }

  private getCoords(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        reject,
        { timeout: 5000 }
      )
    );
  }

  private interpret(code: number, isDay: boolean): { label: string; emoji: string; colors: [string, string, string] } {
    if (code === 0) {
      return isDay
        ? { label: 'Clear',       emoji: '☀️', colors: ['#FFD700', '#FF8C42', '#4FC3F7'] }
        : { label: 'Clear Night', emoji: '🌙', colors: ['#1a1a4e', '#6c5ce7', '#a29bfe'] };
    }
    if (code <= 3) {
      return isDay
        ? { label: 'Partly Cloudy', emoji: '⛅', colors: ['#74b9ff', '#a8c0cc', '#dfe6e9'] }
        : { label: 'Cloudy Night', emoji: '☁️', colors: ['#1a1a2e', '#2d3561', '#0f3460'] };
    }
    if (code <= 48) {
      return { label: 'Foggy',  emoji: '🌫️', colors: ['#b2bec3', '#90a4ae', '#cfd8dc'] };
    }
    if (code <= 67) {
      return { label: 'Rainy',  emoji: '🌧️', colors: ['#1565C0', '#0288D1', '#29B6F6'] };
    }
    if (code <= 86) {
      return { label: 'Snowy',  emoji: '❄️', colors: ['#bbdefb', '#81d4fa', '#e3f2fd'] };
    }
    return   { label: 'Stormy', emoji: '⛈️', colors: ['#1c1c2e', '#4a148c', '#6a1b9a'] };
  }
}

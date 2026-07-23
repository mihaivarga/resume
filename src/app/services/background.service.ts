import { Injectable } from '@angular/core';
import { WeatherData } from './weather.service';

/** Generates random background images based on weather + location */
@Injectable({ providedIn: 'root' })
export class BackgroundService {
  private readonly defaultImages = [10, 28, 42, 54, 68, 76, 82, 94, 108, 237, 367, 553, 761, 1024];

  getBackgroundUrl(weather: WeatherData | null): string {
    // Create a unique seed from weather + location + random component for variety
    const location = `${weather?.city || 'unknown'}-${weather?.country || 'us'}`;
    const condition = weather?.condition || 'clear';
    const season = weather?.season || 'summer';
    const randomComponent = Math.floor(Math.random() * 10000);
    
    const seed = `${season}-${condition}-${location}-${randomComponent}`;
    const seedHash = this.hash(seed);

    return `https://picsum.photos/seed/${seedHash}/1920/1080`;
  }

  private hash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

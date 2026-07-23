import { Injectable } from '@angular/core';
import { WeatherData } from './weather.service';

/** Maps weather + season to Lorem Picsum seed IDs for nice background images */
@Injectable({ providedIn: 'root' })
export class BackgroundService {
  private readonly backgroundMap: Record<string, number[]> = {
    // Clear day - spring
    'clear-spring': [14, 28, 39, 48, 54, 60, 68, 74, 78, 82],
    'clear-summer': [10, 16, 19, 22, 25, 29, 33, 35, 38, 41],
    'clear-autumn': [15, 27, 36, 42, 45, 52, 56, 63, 71, 76],
    'clear-winter': [12, 20, 31, 44, 50, 58, 64, 69, 73, 79],
    // Clear night
    'clear_night-spring': [20, 32, 46, 53, 59, 65, 70, 75, 80, 83],
    'clear_night-summer': [18, 30, 43, 51, 57, 62, 66, 72, 77, 81],
    'clear_night-autumn': [21, 34, 47, 55, 61, 67, 84, 86, 88, 90],
    'clear_night-winter': [23, 37, 49, 66, 85, 87, 89, 91, 93, 95],
    // Cloudy
    'cloudy-spring': [26, 40, 66, 92],
    'cloudy-summer': [24, 38, 64, 94],
    'cloudy-autumn': [29, 42, 68, 96],
    'cloudy-winter': [31, 45, 70, 98],
    'cloudy_night-spring': [28, 44, 69, 99],
    'cloudy_night-summer': [30, 46, 71, 101],
    'cloudy_night-autumn': [32, 48, 72, 102],
    'cloudy_night-winter': [34, 50, 74, 104],
    // Foggy
    'foggy-spring': [8, 17, 38, 56],
    'foggy-summer': [6, 14, 35, 52],
    'foggy-autumn': [9, 19, 40, 58],
    'foggy-winter': [7, 16, 36, 54],
    // Rainy
    'rainy-spring': [11, 23, 43, 67],
    'rainy-summer': [13, 25, 46, 69],
    'rainy-autumn': [15, 27, 48, 71],
    'rainy-winter': [10, 22, 41, 65],
    // Snowy
    'snowy-spring': [5, 26, 47, 97],
    'snowy-summer': [3, 24, 60, 100],
    'snowy-autumn': [6, 28, 50, 103],
    'snowy-winter': [4, 22, 44, 95],
    // Stormy
    'stormy-spring': [18, 35, 62, 105],
    'stormy-summer': [16, 33, 58, 106],
    'stormy-autumn': [20, 37, 64, 107],
    'stormy-winter': [14, 31, 56, 108],
  };

  private readonly defaultImages = [10, 28, 42, 54, 68, 76, 82, 94];

  getBackgroundUrl(weather: WeatherData | null): string {
    if (!weather) {
      return this.getRandomDefault();
    }

    const key = this.getKey(weather);
    const seeds = this.backgroundMap[key] || this.defaultImages;
    const seed = seeds[Math.abs(this.hash(key)) % seeds.length];

    return `https://picsum.photos/seed/${seed}/1920/1080`;
  }

  private getKey(weather: WeatherData): string {
    const condition = weather.condition;
    const season = weather.season;
    const isNight = weather.emoji === '🌙' || weather.label?.toLowerCase().includes('night');

    let key = condition;
    if (isNight && (condition === 'clear' || condition === 'cloudy')) {
      key += '_night';
    }
    key += `-${season}`;
    return key;
  }

  private getRandomDefault(): string {
    const seed = this.defaultImages[Math.floor(Math.random() * this.defaultImages.length)];
    return `https://picsum.photos/seed/${seed}/1920/1080`;
  }

  private hash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
}

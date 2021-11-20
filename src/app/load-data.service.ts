import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Measure } from './models/data.models';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadDataService {
  measures$: Observable<Measure[]>;

  constructor(private readonly http: HttpClient) {
    this.measures$ = new BehaviorSubject<Measure[]>([]);
  }

  loadData(): Observable<Measure[]> {
    return this.http
      .get('/assets/data.csv', { responseType: 'text' })
      .pipe(map((textResult) => this.fromTextToMeasures(textResult)));
  }

  fromTextToMeasures(textResult: string): Measure[] {
    const results: Measure[] = [];
    const lines = textResult.split('\n');
    const length = lines.length;
    for (let i = 1; i < length; i++) {
      const [
        timestamp,
        seaTemperature,
        temperature,
        windSpeed,
        seaStatus,
        medusaPresence,
        medusaSpecies,
        rain,
      ] = lines[i].split(';');

      const parsed: Measure = {
        timestamp: new Date(timestamp),
        seaTemperature: parseFloat(seaTemperature),
        temperature: parseFloat(temperature),
        windSpeed: parseFloat(windSpeed),
        seaStatus: parseInt(seaStatus),
        medusaPresence: parseInt(medusaPresence),
        medusaSpecies: medusaSpecies?.split(',') || [],
        rain: parseFloat(rain),
      };
      results.push(parsed);
    }
    return results;
  }
}

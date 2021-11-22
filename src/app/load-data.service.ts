import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Measures } from './models/data.models';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadDataService {
  constructor(private readonly http: HttpClient) {}

  loadData(): Observable<Measures> {
    return this.http
      .get('/assets/data.csv', { responseType: 'text' })
      .pipe(map((textResult) => this.fromTextToMeasures(textResult)));
  }

  fromTextToMeasures(textResult: string): Measures {
    const results: Measures = {
      medusaPresence: [],
      medusaSpecies: [],
      rain: [],
      seaStatus: [],
      seaTemperature: [],
      temperature: [],
      windSpeed: [],
    };
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
      const date = new Date(timestamp).getTime();
      results.seaTemperature.push([date, parseFloat(seaTemperature)]);
      results.temperature.push([date, parseFloat(temperature)]);
      results.windSpeed.push([date, parseFloat(windSpeed)]);
      results.seaStatus.push([date, parseInt(seaStatus)]);
      results.medusaPresence.push([date, parseInt(medusaPresence)]);
      results.rain.push([date, parseFloat(rain)]);
    }
    return results;
  }
}

export interface Measure {
  timestamp: Date;
  seaTemperature: number;
  temperature: number;
  windSpeed: number;
  seaStatus: number;
  medusaPresence: number;
  medusaSpecies: string[];
  rain: number;
}

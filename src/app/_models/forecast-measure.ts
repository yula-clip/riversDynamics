import { MeasuringPoint } from './measuring-point';
import { Substance } from './substance';

export class ForecastMeasure {
  id: number;
  date: Date;
  measuringPoints: MeasuringPoint[];
  substances: Substance[];
  value: string;
}

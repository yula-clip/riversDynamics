import { MeasuringPoint } from './measuring-point';
import { Substance } from './substance';

export class RealMeasure {
  id: number;
  date: Date;
  measuringPoints: MeasuringPoint[];
  substances: Substance[];
  value: string;
}

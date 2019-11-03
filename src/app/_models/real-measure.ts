import { MeasuringPoint } from './measuring-point';
import { Substance } from './substance';
import { AbstractEntity } from './abstract-entity';

export class RealMeasure extends AbstractEntity {
  date?: Date;
  measuring_points: MeasuringPoint[];
  substance: Substance;
  substance_id: number;
  value: string;
  constructor(id: number) {
    super(id);
  }
}

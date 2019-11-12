import { MeasuringPoint } from './measuring-point';
import { Substance } from './substance';
import { AbstractEntity } from './abstract-entity';

export class RealMeasure extends AbstractEntity {
  date?: Date;
  measuring_point: MeasuringPoint;
  measPointId: number;
  substance: Substance;
  substId: number;
  value: string;
  constructor(id: number) {
    super(id);
  }
}

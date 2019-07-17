import { MeasuringPoint } from './measuring-point';
import { Substance } from './substance';
import { AbstractEntity } from './abstract-entity';

export class RealMeasure extends AbstractEntity {
  date: Date;
  measuringPoints: MeasuringPoint[];
  substance: Substance;
  value: string;
  constructor(id: number) {
    super(id);
}
}

import { AbstractEntity } from './abstract-entity';
import { RiverSection } from './river-section';

export class MeasuringPoint extends AbstractEntity {
  constructor(id: number, name: string) {
    super(id, name);
  }
  x: string;
  y: string;
  riverSection: RiverSection;
}

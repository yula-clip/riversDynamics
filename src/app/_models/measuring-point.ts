import { AbstractEntity } from './abstract-entity';
import { RiverSection } from './river-section';
import { River } from './river';

export class MeasuringPoint extends AbstractEntity {
  constructor(id: number, name: string) {
    super(id, name);
  }
  x: string;
  y: string;
  river: River;
  riverSection: RiverSection;
}

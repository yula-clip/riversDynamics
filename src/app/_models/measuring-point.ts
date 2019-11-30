import { AbstractEntity } from './abstract-entity';
import { RiverSection } from './river-section';
import { River } from './river';

export class MeasuringPoint extends AbstractEntity {
  constructor(id: number, name: string) {
    super(id, name);
  }
  x: number;
  y: number;
  river_id?: number;
  river_section_id: number;
  river_section?: RiverSection;
  river?: River;
}

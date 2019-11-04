import { AbstractEntity } from './abstract-entity';

export class MeasuringPoint extends AbstractEntity {
  constructor(id: number, name: string) {
    super(id, name);
  }
  x: number;
  y: number;
  river_id: number;
  river_section_id: number;
}

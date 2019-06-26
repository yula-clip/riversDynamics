import { AbstractEntity } from './abstract-entity';

export class Substance extends AbstractEntity {
  constructor(id: number, name: string) {
    super(id, name);
  }
  latinName: string;
  coefficient1: number;
  coefficient2: number;
  coefficient3: number;
  unitsOfMeasurement: string;
  unitsOfMeasurementCollapse: string;
  validValues: number;
  status: boolean;
}

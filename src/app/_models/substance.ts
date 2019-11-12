import { AbstractEntity } from './abstract-entity';

export class Substance extends AbstractEntity {
  constructor(id: number, name: string) {
    super(id, name);
  }
  latinName: string;
  k1: number;
  k2: number;
  k3: number;
  unitsMeasure: string;
  validValue: number;
  isCleaning: boolean;
}

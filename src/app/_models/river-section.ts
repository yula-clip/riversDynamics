import { AbstractEntity } from './abstract-entity';
export class RiverSection extends AbstractEntity {
  public river_id: number;
  public diffuse: number;
  public velosity: number;
    constructor(id: number, name: string) {
        super(id, name);
    }
}

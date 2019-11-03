import { AbstractEntity } from './abstract-entity';
export class RiverSection extends AbstractEntity {
  public river_id: number;
  public diffuse: number;
    constructor(id: number, name: string) {
        super(id, name);
    }
}

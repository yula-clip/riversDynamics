import { AbstractEntity } from './abstract-entity';
import { River } from './river';
export class RiverSection extends AbstractEntity {
  public river: River;
  public diffuse: number;
    constructor(id: number, name: string) {
        super(id, name);
    }
}

import { AbstractEntity } from './abstract-entity';
export class River extends AbstractEntity {
    constructor(id: number, name: string) {
        super(id, name);
    }
}

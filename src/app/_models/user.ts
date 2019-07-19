import { AbstractEntity } from './abstract-entity';
export class User extends AbstractEntity {
    public token?: string;
    public isAdmin: boolean;
    constructor(id: number, name: string) {
        super(id, name);
    }
}

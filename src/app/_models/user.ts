import { AbstractEntity } from './abstract-entity';
export class User extends AbstractEntity {
    public token?: string;
    public isAdmin: boolean;
    public email: string;
    public password?: any;
    constructor(id: number, name: string) {
        super(id, name);
    }
}

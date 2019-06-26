export class AbstractEntity {
    public id: number;
    public name: string;
    constructor(_id: number, _name: string) {
        this.name = _name;
        this.id = _id;
    }
}

export class AbstractEntity {
  public id: number;
  public name?: string;
  date?: any;
  constructor(_id: number, _name?: string) {
    if (_name) {
      this.name = _name;
    }
    this.id = _id;
  }
}

export class PackModel {
    public id: string;
    public name: string;

    constructor(value: any) {
        this.id = value['id'];
        this.name = value['name'];
    }
}

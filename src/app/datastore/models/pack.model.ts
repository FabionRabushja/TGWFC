export class PackModel {
    public id: string;
    public name: string;
    public clicked: boolean;

    constructor(value: any) {
        this.id = value['id'];
        this.name = value['name'];
        this.clicked = false;
    }
}

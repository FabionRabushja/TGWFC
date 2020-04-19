export class RoomModel {
    public id: string;
    public url: string;

    constructor(value: JSON) {
        this.id = value['id'];
        this.url = value['url'];
    }
}

export class CardModel {
    public userId: string;
    public card: string;

    constructor(value: any) {
        this.userId = value['userId'];
        this.card = value['card'];
    }
}

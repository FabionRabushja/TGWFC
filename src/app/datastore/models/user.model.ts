export class UserModel {
    public uuid: string;
    public username: string;
    public points: string;
    public cards: string[] = [];

    constructor(value: JSON) {
        this.uuid = value["userId"];
        this.username = value["username"];
        this.points = value["points"];
        for (const card of value["cards"]){
            this.cards.push(card);
        }
    }

}

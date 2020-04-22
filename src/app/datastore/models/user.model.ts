export class UserModel {
    public host: boolean;
    public uuid: string;
    public username: string;
    public points: string;
    public cards: string[] = [];

    constructor(value: any) {
        this.host = value["host"];
        this.uuid = value["id"];
        this.username = value["username"];
        this.points = value["points"];
        if (value["cards"]) {
            for (const card of value["cards"]){
                this.cards.push(card);
            }
        }
    }
}

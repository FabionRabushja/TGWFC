export class CreateRoomModel {
    public username: string;
    public numberOfRounds: number;
    public packs: string[] = [];

    constructor(username: string, numberOfRounds: number, packs: string[]) {
        this.username = username;
        this.numberOfRounds = numberOfRounds;
        this.packs = packs;
    }
}

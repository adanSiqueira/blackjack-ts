import { Hand } from '../cards/Hand';
export class Player {
    constructor(funds) {
        this.funds = funds;
        this.hand = new Hand();
        this.funds = funds;
    }
    resetHand() {
        this.hand = new Hand();
    }
}
//# sourceMappingURL=Player.js.map
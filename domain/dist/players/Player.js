import { Hand } from '../cards/Hand.js';
export class Player {
    funds;
    hand = new Hand();
    constructor(funds) {
        this.funds = funds;
        this.funds = funds;
    }
    resetHand() {
        this.hand = new Hand();
    }
}
//# sourceMappingURL=Player.js.map
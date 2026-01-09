export class Card {
    value;
    rank;
    suit;
    constructor(value, rank, suit) {
        this.value = value;
        this.rank = rank;
        this.suit = suit;
    }
    toString() {
        return `${this.value} ${this.suit}`;
    }
}
//# sourceMappingURL=Card.js.map
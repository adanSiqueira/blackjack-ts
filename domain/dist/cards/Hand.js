export class Hand {
    constructor() {
        this.cards = [];
    }
    add(card) {
        this.cards.push(card);
    }
    get value() {
        let total = 0;
        let aces = 0;
        for (const card of this.cards) {
            if (['K', 'Q', 'J'].includes(card.value))
                total += 10;
            else if (card.value === 'A')
                aces++;
            else
                total += Number(card.value);
        }
        for (let i = 0; i < aces; i++) {
            total += total + 11 <= 21 ? 11 : 1;
        }
        return total;
    }
    toString() {
        return this.cards.map(c => c.toString()).join(', ');
    }
    get firstCard() {
        return this.cards[0];
    }
}
//# sourceMappingURL=Hand.js.map
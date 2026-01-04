import { Player } from './Player';
export class Dealer extends Player {
    play(deck) {
        console.log(`Dealer's hand: ${this.hand.toString()}. Total: ${this.hand.value}`);
        console.log('The dealer will hit if their total is less than 17 and stand once it reaches 17 or more.');
        let hit = 1;
        while (this.hand.value < 17) {
            this.hand.add(deck.draw());
            console.log(`HIT ${hit}: Dealer's hand: ${this.hand.toString()}. Total: ${this.hand.value}`);
            hit += 1;
        }
    }
}
//# sourceMappingURL=Dealer.js.map
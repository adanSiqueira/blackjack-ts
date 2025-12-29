import { Player } from './Player';
import { Deck } from '../cards/Deck';

export class Dealer extends Player {
  play(deck: Deck): void {
    console.log(`Dealer's hand: ${this.hand.toString()}. Total: ${this.hand.value}`);
    console.log('The dealer will hit if their total is less than 17 and stand once it reaches 17 or more.');
    let hit = 1
    while (this.hand.value < 17) {
      this.hand.add(deck.draw());
      console.log(`HIT ${hit}: Dealer's hand: ${this.hand.toString()}. Total: ${this.hand.value}`);
      hit += 1;
    }
  }
}
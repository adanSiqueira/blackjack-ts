import { Deck } from '../cards/Deck.js';
import { Player } from '../players/Player.js';
import { Dealer } from '../players/Dealer.js';

export class Game {
  private deck = new Deck();
  public player = new Player(100);
  public dealer = new Dealer(0);

  start(bet: number): void {
    this.player.hand.add(this.deck.draw());
    this.player.hand.add(this.deck.draw());

    this.dealer.hand.add(this.deck.draw());
    this.dealer.hand.add(this.deck.draw());

    console.log(`Your hand: ${this.player.hand}. Total: ${this.player.hand.value}`);
    console.log(`Dealer shows: ${this.dealer.hand.firstCard}`);
  }

  hitPlayer(): void {
    this.player.hand.add(this.deck.draw());
  }

  stand(): void {
    this.dealer.play(this.deck);
  }

  getResult(): string {
    const p = this.player.hand.value;
    const d = this.dealer.hand.value;

    if (p > 21) return 'Player busts';
    if (d > 21) return 'Dealer busts — you win';
    if (p > d) return 'You win';
    if (p < d) return 'Dealer wins';
    return 'Push';
  }
}
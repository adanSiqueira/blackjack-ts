import { Card } from './Card.js';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    const suits = ['♠ Spades', '♥ Hearts', '♦ Diamonds', '♣ Clubs'];

    this.cards = values.flatMap(v =>
      suits.map(s => new Card(v, s))
    );

    this.shuffle();
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j]!, this.cards[i]!];
    }
  }

  draw(): Card {
    const card = this.cards.pop();
    if (!card) throw new Error('Deck is empty');
    return card;
  }
}
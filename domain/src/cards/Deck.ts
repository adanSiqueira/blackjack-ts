import { Card } from './Card.js';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    const ranks = [
      'A','2','3','4','5','6','7','8','9','10','J','Q','K'
    ] as const;

    const suits = [
      'hearts',
      'diamonds',
      'clubs',
      'spades'
    ] as const;

    this.cards = ranks.flatMap(rank =>
      suits.map(suit =>
        new Card(
          rank, // value (Blackjack logic)
          rank, // rank (identity)
          suit  // suit (normalized)
        )
      )
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

export class Card {
  constructor(
    public readonly value: string,
    public readonly suit: string
  ) {}

  toString(): string {
    return `${this.value} ${this.suit}`;
  }
}
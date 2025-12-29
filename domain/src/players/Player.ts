import { Hand } from '../cards/Hand';

export class Player {
  public hand = new Hand();

  constructor(public funds: number) {
    this.funds = funds;
  }

  resetHand(): void {
    this.hand = new Hand();
  }
}
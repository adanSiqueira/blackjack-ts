import { Player } from '../players/Player.js';
import { Dealer } from '../players/Dealer.js';
export declare class Game {
    private deck;
    player: Player;
    dealer: Dealer;
    start(bet: number): void;
    hitPlayer(): void;
    stand(): void;
    getResult(): string;
}
//# sourceMappingURL=Game.d.ts.map
import { Player } from '../players/Player';
import { Dealer } from '../players/Dealer';
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
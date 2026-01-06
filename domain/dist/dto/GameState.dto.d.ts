import type { PlayerStateDTO } from './PlayerState.dto.ts';
export type GamePhase = 'betting' | 'player_turn' | 'dealer_turn' | 'finished';
export type GameResult = 'win' | 'lose' | 'push';
export type GameStateDTO = {
    gameId: string;
    player: PlayerStateDTO;
    dealer: PlayerStateDTO;
    phase: GamePhase;
    result?: GameResult;
};
//# sourceMappingURL=GameState.dto.d.ts.map
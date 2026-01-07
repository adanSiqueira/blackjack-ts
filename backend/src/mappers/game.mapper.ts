import type { GameStateDTO, CardDTO, PlayerStateDTO } from '@blackjack/domain';
import { Game } from '@blackjack/domain';

function mapCard(card: any): CardDTO {
  return {
    suit: card.suit,
    rank: card.rank,
  };
}

function mapPlayer(player: any, id: string): PlayerStateDTO {
  const cards = player.hand?.cards ?? [];
  return {
    id,
    hand: cards.map(mapCard),
    value: player.hand?.value ?? 0,
    funds: player.funds ?? 0,
    status:
      (player.hand?.value ?? 0) > 21
        ? 'bust'
        : 'playing',
  };
}

export function mapGameToState(game: Game, gameId: string): GameStateDTO {
  return {
    gameId,
    player: mapPlayer(game.player, 'player'),
    dealer: mapPlayer(game.dealer, 'dealer'),
    phase: 'player_turn',
  };
}
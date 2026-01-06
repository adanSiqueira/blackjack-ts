import type { GameStateDTO, CardDTO, PlayerStateDTO } from '@blackjack/domain';
import { Game } from '@blackjack/domain';

function mapCard(card: any): CardDTO {
  return {
    suit: card.suit,
    rank: card.rank,
  };
}

function mapPlayer(player: any, id: string): PlayerStateDTO {
  return {
    id,
    hand: player.hand.cards.map(mapCard),
    value: player.hand.value,
    funds: player.funds,
    status:
      player.hand.value > 21
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
import type { GameStateDTO, CardDTO, PlayerStateDTO } from '@blackjack/domain';
import { Game } from '@blackjack/domain';

function mapCard(card: any): CardDTO {
  return {
    suit: card.suit,
    rank: card.rank,
  };
}

function mapPlayer(
  player: any,
  id: string,
  options?: { hideSecondCard?: boolean }
): PlayerStateDTO {
  const cards = player.hand.cards.map(mapCard);

  return {
    id,
    hand: options?.hideSecondCard
      ? cards.slice(0, 1) // 👈 only first card visible
      : cards,
    value: options?.hideSecondCard ? 0 : player.hand.value,
    funds: player.funds,
    status:
      (options?.hideSecondCard ? 0 : player.hand.value) > 21
        ? 'bust'
        : 'playing',
  };
}


export function mapGameToState(game: Game, gameId: string): GameStateDTO {
  const phase = 'player_turn'; // later this becomes dynamic

  return {
    gameId,
    player: mapPlayer(game.player, 'player'),
    dealer: mapPlayer(game.dealer, 'dealer', {
      hideSecondCard: phase === 'player_turn',
    }),
    phase,
  };
}
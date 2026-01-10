import type { GameStateDTO } from '@blackjack/domain';
import { Hand } from '../Hand/Hand';
import { BetControls } from '../BetControls/BetControls';

function getGameMessage(game: GameStateDTO): string {
  if (game.phase === 'player_turn') {
    return 'Your turn';
  }

  if (game.phase === 'finished') {
    if (game.player.value === 21) {
      return 'Blackjack! - You Win!';
    }

    switch (game.result) {
      case 'win':
        return 'You win!';
      case 'lose':
        return 'You lose';
      case 'push':
        return 'Push';
    }
  }

  return '';
}


type TableProps = {
  game: GameStateDTO;
  onHit: () => void;
  onStand: () => void;
};

export function Table({ game, onHit, onStand }: TableProps) {

  const actionsDisabled = game.phase !== 'player_turn';
  const message = getGameMessage(game);

  if (!game.player || !game.dealer) {
    return <div><p>Loading game...</p></div>;
  }

  return (
    <div>
      <h2>{message}</h2>

      <Hand
        label="Dealer"
        cards={game.dealer.hand}
        value={game.dealer.value}
      />

      <Hand
        label="Player"
        cards={game.player.hand}
        value={game.player.value}
      />

      <BetControls onHit={onHit} onStand={onStand} disabled={actionsDisabled} />
    </div>
  );
}
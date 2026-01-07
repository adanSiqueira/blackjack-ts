import type { GameStateDTO } from '@blackjack/domain';
import { Hand } from '../Hand/Hand';
import { BetControls } from '../BetControls/BetControls';

type TableProps = {
  game: GameStateDTO;
  onHit: () => void;
  onStand: () => void;
};

export function Table({ game, onHit, onStand }: TableProps) {

  if (!game.player || !game.dealer) {
    return <div><p>Loading game...</p></div>;
  }

  return (
    <div>
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

      <BetControls onHit={onHit} onStand={onStand} />
    </div>
  );
}
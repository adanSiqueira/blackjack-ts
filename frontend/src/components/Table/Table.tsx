import { useEffect, useState } from 'react';
import type { CardDTO, GameStateDTO } from '@blackjack/domain';
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

function calculateHandValue(cards: CardDTO[]): number {
  let total = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === 'A') {
      aces++;
      total += 11;
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      total += 10;
    } else {
      total += Number(card.rank);
    }
  }

  // Adjust for aces
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

const DEALER_REVEAL_DELAY_MIN = 500;
const DEALER_REVEAL_DELAY_MAX = 1250;

function randomDelay() {
  return (
    DEALER_REVEAL_DELAY_MIN +
    Math.random() *
      (DEALER_REVEAL_DELAY_MAX - DEALER_REVEAL_DELAY_MIN)
  );
}

type TableProps = {
  game: GameStateDTO;
  onHit: () => void;
  onStand: () => void;
};

export function Table({ game, onHit, onStand }: TableProps) {
  const playerBust =
  game.phase === 'finished' && game.player.value > 21;

  const playerBlackjack =
  game.phase === 'finished' && game.player.value === 21;

  const [isDealerRevealing, setIsDealerRevealing] = useState(false);
  const actionsDisabled = game.phase !== 'player_turn';
  const [visibleDealerCards, setVisibleDealerCards] = useState<CardDTO[]>([]);
  const visibleDealerValue = game.phase === 'finished' ? calculateHandValue(visibleDealerCards) : game.dealer.value;
  const message =
  game.phase === 'player_turn'
    ? 'Your turn'
    : playerBlackjack
    ? 'Blackjack! - You Win!'
    : playerBust
    ? 'You lose'
    : isDealerRevealing
    ? 'Dealer is playing...'
    : getGameMessage(game);


  if (!game.player || !game.dealer) {
    return <div><p>Loading game...</p></div>;
  }

  useEffect(() => {
    if (game.phase !== 'finished') {
      // During player turn: show only what's allowed
      setVisibleDealerCards(game.dealer.hand);
      setIsDealerRevealing(false);
      return;
    }

    if (game.player.value >= 21) {
      // Player busted → reveal all dealer cards immediately
      setVisibleDealerCards(game.dealer.hand);
      setIsDealerRevealing(false);
      return;
    }

    // Finished → reveal cards one by one
    setVisibleDealerCards([]);
    setIsDealerRevealing(true);

    game.dealer.hand.forEach((card, index) => {
      setTimeout(() => {
        setVisibleDealerCards(prev => [...prev, card]);

        if (index === game.dealer.hand.length - 1) {
          setIsDealerRevealing(false);
        }
      }, randomDelay() * index);
    });
  }, [game.phase, game.dealer.hand, game.player.value]);


  return (
    <div>
      <h2>{message}</h2>

      <Hand
        label="Dealer"
        cards={visibleDealerCards}
        value={visibleDealerValue}
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
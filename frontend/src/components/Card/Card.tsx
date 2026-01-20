import type { CardDTO as CardType } from '@blackjack/domain';

type CardProps = {
  card: CardType;
};

export function Card({ card }: CardProps) {
  return (
    <img
      src={`/cards/${card.rank}-${card.suit}.png`}
      alt={`${card.rank}${card.suit}`}
      className="card"
    />
  );
}
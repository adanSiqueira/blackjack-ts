import type { CardDTO as CardType } from '@blackjack/domain';

type CardProps = {
  card: CardType;
};

export function Card({ card }: CardProps) {
  return (
    <div
      style={{
        border: '1px solid #333',
        borderRadius: 6,
        padding: 8,
        width: 60,
        textAlign: 'center',
        backgroundColor: 'white'
      }}
    >
      <div>{card.rank}</div>
      <div>{card.suit}</div>
    </div>
  );
}
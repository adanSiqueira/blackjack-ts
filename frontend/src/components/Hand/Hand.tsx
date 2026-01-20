import { Card } from '../Card/Card';
import type { CardDTO as CardType } from '@blackjack/domain';

type HandProps = {
  label: string;
  cards: CardType[];
  value: number;
};

export function Hand({ label, cards, value }: HandProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>
        {label} — Total: {value}
      </h3>

      <div style={{ display: 'flex', gap: 8 }}>
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
}
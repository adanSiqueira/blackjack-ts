import type { CardDTO } from './Card.dto.ts';

export type PlayerStatus = 'playing' | 'bust' | 'stand';

export type PlayerStateDTO = {
  id: string;
  hand: CardDTO[];
  value: number;
  funds: number;
  status: PlayerStatus;
};
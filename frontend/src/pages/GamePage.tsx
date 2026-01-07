import { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import { Table } from '../components/Table/Table';

export function GamePage() {
  const { game, createGame, hit, stand, loading, error } = useGame();

  useEffect(() => {
    createGame();
  }, [createGame]);

  if (loading && !game) {
    return <p>Loading game...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!game) {
    return <p>Waiting for game...</p>;
  }

  return (
    <div>
      <h1>Blackjack</h1>
      <Table game={game} onHit={hit} onStand={stand} />
    </div>
  );
}

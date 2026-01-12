import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { Table } from '../components/Table/Table';

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const { game, refreshGame, hit, stand, loading, error } = useGame();

  useEffect(() => {
    if (!id) return;
    refreshGame(id);
  }, [id, refreshGame]);

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

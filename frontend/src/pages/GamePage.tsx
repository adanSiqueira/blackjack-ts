import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { Table } from '../components/Table/Table';
import { createGame } from '../services/api';

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const { game, refreshGame, hit, stand, loading, error } = useGame();
  const navigate = useNavigate();
  const [canPlayAgain, setCanPlayAgain] = useState(false);

  useEffect(() => {
    if (!id) return;
    setCanPlayAgain(false);
    refreshGame(id);
  }, [id, refreshGame]);

  const handlePlayAgain = async () => {
    const newGame = await createGame();
    navigate(`/game/${newGame.gameId}`);
  };

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
      <Table game={game} onHit={hit} onStand={stand} onDealerRevealComplete={() => setCanPlayAgain(true)}/>

      {game.phase === 'finished' && canPlayAgain && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button onClick={handlePlayAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

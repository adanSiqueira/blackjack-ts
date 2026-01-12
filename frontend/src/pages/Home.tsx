import { useNavigate } from 'react-router-dom';
import { createGame } from '../services/api';

export function Home() {
  const navigate = useNavigate();

  const startGame = async () => {
    const game = await createGame();
    navigate(`/game/${game.gameId}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Blackjack</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

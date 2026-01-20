import { useNavigate } from 'react-router-dom';
import { createGame } from '../services/api';

export function Home() {
  const navigate = useNavigate();

  const startGame = async () => {
    const game = await createGame();
    navigate(`/game/${game.gameId}`);
  };

  return (
    <div className="home-main-div">
      <h1 className="home-title">Blackjack</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

// @ts-nocheck
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { Chessboard } from "../components/Chessboard";
import { useNavigate } from "react-router-dom";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleSocketMessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME: {
          const { color } = message.payload;
          alert(`Game started, you are ${color}`);
          const newChess = new Chess(); // Create a new instance for the game
          setChess(newChess);
          setBoard(newChess.board());
          setStarted(true);
          break;
        }

        case MOVE: {
          const { move } = message;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        }

        case GAME_OVER: {
          const { winner } = message.payload;
          console.log("Game over");
          alert(`Game over. The winner is ${winner}`);
          setChess(new Chess()); // Reset the chess game
          setBoard(new Chess().board()); // Reset the board
          navigate("/");
          break;
        }

        default:
          break;
      }
    };

    socket.onmessage = handleSocketMessage;

    return () => {
      socket.onmessage = null; // Clean up listener when component unmounts
    };
  }, [socket, chess, navigate]);

  const handlePlayButton = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: INIT_GAME,
        })
      );
    }
  };

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="bg-black">
      <div className="max-w-screen-lg flex m-auto">
        <div className="w-1/2 pl-10">
          <Chessboard
            board={board}
            socket={socket}
            setBoard={setBoard}
            chess={chess}
          />
        </div>
        <div className="w-1/2">
          {!started && (
            <button
              onClick={handlePlayButton}
              className="p-3 m-16 bg-green-500"
            >
              Play Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;

import { useState } from "react";

export const Chessboard = ({
  board,
  socket,
  setBoard,
  chess,
}) => {
  // State for selected squares
  const [from, setFrom] = useState(null);
  const [_to, setTo] = useState(null);

  const MOVE = "move";

  return (
    <div className="flex justify-center items-center h-fit bg-gray-800">
      <div
        className="grid grid-cols-8 aspect-square"
        style={{
          maxWidth: "90vw", // Ensures board scales to smaller screens
          maxHeight: "90vw",
        }}
      >
        {board.map((row, i) =>
          row.map((square, j) => {
            const squareRep = String.fromCharCode(97 + (j % 8)) + (8 - i);

            return (
              <div
                onClick={() => {
                  if (!from) {
                    setFrom(squareRep); // Set the starting square
                  } else {
                    const currentFrom = from; // Capture the current value of `from`
                    const currentTo = squareRep; // Capture the current square as `to`

                    setTo(currentTo);

                    // Send the move
                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        move: {
                          from: currentFrom,
                          to: currentTo,
                        },
                      })
                    );

                    console.log(currentFrom, currentTo);

                    // Reset the state for the next move
                    setFrom(null);
                    setTo(null);
                  }
                }}
                key={`${i}-${j}`}
                className={`aspect-square flex justify-center items-center ${
                  from === squareRep
                    ? "bg-red-300" // Highlight the selected square
                    : (i + j) % 2 === 0
                    ? "bg-[#D18B47]" // Default dark color
                    : "bg-[#FFCE9E]" // Default light color
                } hover:bg-yellow-300`}
              >
                {/* Render the piece if it exists */}
                {square ? (
                  <img
                    className="w-full h-full max-w-[80%] max-h-[80%]"
                    src={`./${
                      square.color === "b"
                        ? square.type // Black pieces
                        : `${square.type.toUpperCase()} copy` // White pieces
                    }.svg`}
                    alt={`${square.color} ${square.type}`}
                  />
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

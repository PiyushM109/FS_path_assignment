import { useState } from "react";
export default function LudoBoard() {
  let [moves, setMoves] = useState({ blue: 0, red: 0, yellow: 0, green: 0 });
  let updateBlue = () => {
    moves.blue += 1;
    console.log(moves.blue);
    setMoves({ ...moves });
  };
  return (
    <div>
      <p>Game Begins!</p>
      <div className="board">
        <p>Blue Moves ={moves.blue}</p>
        <button style={{ backgroundColor: "blue" }} 
        onClick={() => {
            setMoves({ ...moves, blue: moves.blue + 1 });
          }}>
          +1
        </button>
        <p>Yellow Moves ={moves.yellow}</p>
        <button
          style={{ backgroundColor: "yellow", color: "black" }}
          onClick={() => {
            setMoves({ ...moves, yellow: moves.yellow + 1 });
          }}
        >
          +1
        </button>
        <p>Green Moves ={moves.green}</p>
        <button
          style={{ backgroundColor: "green" }}
          onClick={() => {
            setMoves({ ...moves, green: moves.green + 1 });
          }}
        >
          +1
        </button>
        <p>Red Moves ={moves.red}</p>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            setMoves({ ...moves, red: moves.red + 1 });
          }}
        >
          +1
        </button>
      </div>
    </div>
  );
}

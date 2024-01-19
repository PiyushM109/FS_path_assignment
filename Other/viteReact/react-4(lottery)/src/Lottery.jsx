import { useState } from "react";
import "./Lottery.css";
import { genTicket, sum } from "./helper";
import Ticket from "./Ticket";

export default function Lottery({ n, winningSum }) {
  let [ticket, setTicket] = useState(genTicket(n));
  let isWinning = sum(ticket) === winningSum;
  let buyticket = () => {
    setTicket(genTicket(n));
  };
  return (
    <div>
      <h1>Lottery Game!</h1>
      <div className="ticket">
        <Ticket ticket={ticket} />
      </div>
      <br />
      <br />
      <button onClick={buyticket}>Buy Ticket</button>
      <h3>{isWinning && "Congratulations, you won!"}</h3>
    </div>
  );
}

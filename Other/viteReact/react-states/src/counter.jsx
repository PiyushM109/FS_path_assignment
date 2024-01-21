import { useState } from "react";

export default function Counter() {
    let [count, setCount] = useState(0);
    let incCount = () => {
        setCount(currCount => currCount+1);
    }
    return (
        <div>
            <h3>count={count}</h3>
            <button onClick={incCount}>Counter</button>
        </div>
    );
}
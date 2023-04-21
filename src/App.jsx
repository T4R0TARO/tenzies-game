import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Die from "./components/Die";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTensizes] = useState(false);

  console.log(dice);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomDieValue(),
        held: false,
        id: i + 1,
      };
      newArr.push(newDie);
    }
    return newArr;
  }

  const diceElements = dice.map((die) => <Die key={die.id} {...die} />);

  return (
    <div className="App">
      <main>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>
        <button className="roll-dice">Roll</button>
      </main>
    </div>
  );
}

export default App;

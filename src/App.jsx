import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTensizes] = useState(false);

  console.log(dice);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      held: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie());
    }
    return newArr;
  }

  const diceElements = dice.map((die) => <Die key={die.id} {...die} />);

  // TODO: install Confetti
  // TODO: install nanoid()
  // TODO: complete project
  // TODO: additional features
  // TODO: documentation

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

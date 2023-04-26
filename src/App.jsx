import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Score from "./components/Score";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTensizes] = useState(false);
  const [reRollCounter, setReRollCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [scoreBoard, setScoreBoard] = useState([]);

  useEffect(() => {
    // Timer
    let intervalID = null;
    if (!tenzies) {
      intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [tenzies]);

  console.log(timer);
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTensizes(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function createNewScore() {
    const newScore = {
      counter: reRollCounter,
      time: timer,
    };
    return newScore;
  }

  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie());
    }
    return newArr;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setReRollCounter((prevReRollCounter) => prevReRollCounter + 1);
    } else {
      setTensizes(false);
      setDice(allNewDice());
      setReRollCounter(0);
      setTimer(0);
      setScoreBoard((prevScoreBoard) => [createNewScore(), ...prevScoreBoard]);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      {...die}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const scoreElements = scoreBoard
    .sort((a, b) => a.time - b.time)
    .map((score) => <Score key={nanoid()} {...score} />);

  const topPlayer = scoreElements[0];

  // TODO: additional features
  // Change number value to Die image ✔
  // Tracks number of clicks until player wins ✔
  // Track time passed in secs until player win ✔
  // Display a leader board for best time ✔
  // Create a Start Game page
  // TODO: documentation

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {/* When player wins */}
      <h3>{tenzies && `${reRollCounter} Rolls to Victory!`}</h3>
      <p>
        {tenzies && `TIME: `}
        {timer}
        {tenzies && ` seconds`}
      </p>
      {tenzies && (
        <div className="score-board-container">
          <h3>Leaderboard</h3>
          <h2>👑 {topPlayer}</h2>
          {scoreElements.length === 0 ? "NO RECORD" : scoreElements}
        </div>
      )}
    </main>
  );
}

export default App;

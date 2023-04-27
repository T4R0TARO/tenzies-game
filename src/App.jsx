import { useState } from "react";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Score from "./components/Score";
import "./App.css";

function App() {
  // const [scoreBoard, setScoreBoard] = useState([]);
  const [scoreBoard, setScoreBoard] = useState(
    JSON.parse(localStorage.getItem("scoreBoard")) || []
  );
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTensizes] = useState(false);
  const [reRollCounter, setReRollCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  // set localStorage
  useEffect(() => {
    localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  }, [scoreBoard]);

  // Timer starts when game starts
  useEffect(() => {
    let intervalID = null;
    if (gameStart && !tenzies) {
      intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [gameStart, tenzies]);

  // Checks for player win conditions
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTensizes(true);
    }
  }, [dice]);

  // Starts Game
  function gameStartButton() {
    setGameStart((prevGameStart) => {
      return !prevGameStart;
    });
  }

  // Generate new die obj
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // Create new score obj
  function createNewScore() {
    const newScore = {
      counter: reRollCounter,
      time: timer,
    };
    return newScore;
  }

  // Create 10 new dice obj
  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie());
    }
    return newArr;
  }

  /** rollDice()
   * re-roll number value of unheld dice
   * setReRollCounter: count clicks until tenzies
   *
   * If player wins Tenzies
   * setTenzies: reset game status
   * setDice: reset number value for all dice
   * setReRollCounter: reset click counter
   * setTimer: reset timer to 0
   * setScoreBoard: generate new score and add to scoreBoard
   */
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

  // Freeze/hold number value of die when click
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // Generate Die Component
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      {...die}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  // Generate Score Component and sort in order by time passed
  const scoreElements = scoreBoard
    .sort((a, b) => a.time - b.time)
    .map((score) => <Score key={nanoid()} {...score} />);

  // Reference top score in state `scoreElements`
  const topPlayer = scoreElements[0];

  return (
    <main>
      {/* When game starts render Game */}
      {gameStart ? (
        <div className="game-container">
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
          {/* When player wins display leaderboard */}
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
        </div>
      ) : (
        // Start Game Page
        <div className="starting-page-container">
          <h1>Tenzies</h1>
          <h2>🎲</h2>
          <button className="start-game" onClick={gameStartButton}>
            Start Game
          </button>
        </div>
      )}
    </main>
  );
}

export default App;

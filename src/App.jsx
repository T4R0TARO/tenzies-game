import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  function handleClick() {
    return console.log("wah");
  }

  return (
    <div className="App">
      <h1>Tenzies</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;

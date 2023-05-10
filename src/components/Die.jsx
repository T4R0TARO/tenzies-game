import React from "react";

function Die({ isHeld, holdDice, value }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die-face-container" style={styles}>
      <div className="die-face" onClick={holdDice} data-number={value}></div>
    </div>
  );
}

export default Die;

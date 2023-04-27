import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die-face-container" style={styles}>
      <div
        className="die-face"
        onClick={props.holdDice}
        data-number={props.value}
      ></div>
    </div>
  );
}

export default Die;

import React from "react";

function Score(props) {
  return (
    <div className="score-container">
      <p>
        {props.counter} clicks / {props.time} secs
      </p>
    </div>
  );
}

export default Score;

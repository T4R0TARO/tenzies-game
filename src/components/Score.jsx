import React from "react";

function Score({ counter, time }) {
  return (
    <div className="score-container">
      <p>
        {counter} clicks / {time} secs
      </p>
    </div>
  );
}

export default Score;

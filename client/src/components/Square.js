import React from "react";
import "./Board/Board.css";

function Square({ val, chooseSquare, className }) {
  return (
    <div className={className} onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square;

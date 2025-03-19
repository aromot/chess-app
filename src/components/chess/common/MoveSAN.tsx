import React from "react";

const pieceChars = {
  N: "♞",
  K: "♚",
  Q: "♛",
  R: "♜",
  B: "♝",
};
const pieceCharsKeys = Object.keys(pieceChars);

const MoveSAN = ({ san }: { san: string }) => {
  const sanChars = san.split("");
  return (
    <>
      {sanChars.map((char: string, i) => {
        if (pieceCharsKeys.includes(char)) {
          return (
            <span key={i} className="piece">
              {pieceChars[char]}
            </span>
          );
        }
        return <React.Fragment key={i}>{char}</React.Fragment>;
      })}
    </>
  );
};

export default MoveSAN;

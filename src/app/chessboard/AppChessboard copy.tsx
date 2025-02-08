"use client";

import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import cloneDeep from "lodash/cloneDeep";

const AppChessboard = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [currentTimeout, setCurrentTimeout] = useState();

  console.log({ game });

  function safeGameMutate(modify) {
    return setGame((prevGame) => {
      const game = cloneDeep(prevGame);
      modify(game);
      return game;
    });
  }

  function makeRandomMove() {
    console.log({ game });

    const possibleMoves = game.moves();

    console.log({ possibleMoves });

    // exit if the game is over
    if (game.isGameOver()) {
      alert("Game over");
      return;
    }

    if (game.isDraw()) {
      alert("Draw");
      return;
    }

    if (possibleMoves.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare, targetSquare, piece) {
    console.log({ sourceSquare, targetSquare, piece });

    const gameCopy = cloneDeep(game);

    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      console.log({ move });

      // illegal move => ça ne marche pas, on ne passe pas par là !
      if (move === null) {
        return false;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }

    setGame(gameCopy);

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeRandomMove, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  return (
    <div className="h-screen bg-zinc-900">
      <div className="flex">
        <div className="w-[600px] p-5">
          <Chessboard
            id="chessboard"
            position={game.fen()}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <div className="flex-1 text-white py-5 px-3">Ici la position</div>
      </div>
    </div>
  );
};

export default AppChessboard;

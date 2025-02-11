"use client";

import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import cloneDeep from "lodash/cloneDeep";
import Title1 from "@/components/ui/title1";
import { Directory } from "@prisma/client";
import Link from "next/link";

const AppChessboard = ({ directory }: { directory: Directory }) => {
  const [game, setGame] = useState<Chess>(new Chess());

  console.log({ game });

  // function makeRandomMove() {
  //   console.log({ game });

  //   const possibleMoves = game.moves();

  //   console.log({ possibleMoves });

  //   // exit if the game is over
  //   if (game.isGameOver()) {
  //     alert("Game over");
  //     return;
  //   }

  //   if (game.isDraw()) {
  //     alert("Draw");
  //     return;
  //   }

  //   if (possibleMoves.length === 0) {
  //     return;
  //   }

  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   safeGameMutate((game) => {
  //     game.move(possibleMoves[randomIndex]);
  //   });
  // }

  function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
    } catch (error) {
      console.log({ error });
      return false;
    }

    setGame((game) => cloneDeep(game));

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    // const newTimeout = setTimeout(makeRandomMove, 200);
    // setCurrentTimeout(newTimeout);
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
            boardOrientation={directory.white ? "white" : "black"}
            customBoardStyle={{
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="flex-1 text-white py-5 px-3">
          <div className="mb-5">
            <Title1>Répertoire {`"${directory.name}"`}</Title1>
            <Link href="/directories">&laquo; retour aux répertoires</Link>
          </div>
          <div>Position :</div>
          <div>{game.history().join(" ")}</div>
          <div className="mt-5">PGN :</div>
          <div>{game.pgn()}</div>
        </div>
      </div>
    </div>
  );
};

export default AppChessboard;

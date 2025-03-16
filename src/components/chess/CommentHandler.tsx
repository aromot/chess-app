import { useEffect } from "react";
import { useChessboard } from "./ChessboardProvider";
import { dbg } from "@/lib/helpers";

const CommentHandler = () => {
  const { node } = useChessboard();

  useEffect(() => {
    dbg.debug("request comments for position: " + node.position.id);
  }, [node]);

  return <div>CommentHandler</div>;
};

export default CommentHandler;

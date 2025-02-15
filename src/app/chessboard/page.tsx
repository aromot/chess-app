import { checkAuth } from "@/lib/helpers";
import AppChessboard from "./AppChessboard";

const ChessBoardPage = async () => {
  await checkAuth();

  return <AppChessboard />;
};

export default ChessBoardPage;

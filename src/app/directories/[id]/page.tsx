import AppChessboard from "@/app/chessboard/AppChessboard";
import { checkAuth } from "@/lib/helpers";

const DirectoryPage = async () => {
  await checkAuth();

  return (
    <div>
      <AppChessboard />
    </div>
  );
};

export default DirectoryPage;

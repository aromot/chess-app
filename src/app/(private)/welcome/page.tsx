import { checkAuth } from "@/lib/helpers";
import { getDirectories } from "../directories/_db/db-queries";
import ListDirectories from "../directories/_components/view/ListDirectories";
import DashboardHeader from "./DashboardHeader";

const DashboardPage = async () => {
  const session = await checkAuth();
  const directories = await getDirectories({
    userId: session.user?.id,
    page: 1,
    pageSize: 9999,
  });

  return (
    <div className="pt-3 px-2">
      <DashboardHeader />
      <ListDirectories directories={directories.toObject()} />
    </div>
  );
};

export default DashboardPage;

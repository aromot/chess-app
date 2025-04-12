import Title1 from "@/components/ui/title1";
import { checkAuth } from "@/lib/helpers";
import { getDirectories } from "../directories/_db/db-queries";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ListDirectories from "../directories/_components/view/ListDirectories";

const DashboardPage = async () => {
  const session = await checkAuth();
  const directories = await getDirectories({ userId: session.user.id });

  return (
    <div className="pt-3 px-2">
      <Title1>
        <SidebarTrigger /> Your dashboard
      </Title1>

      <ListDirectories directories={directories} />
    </div>
  );
};

export default DashboardPage;

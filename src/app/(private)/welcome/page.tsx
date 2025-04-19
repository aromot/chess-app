import Title1 from "@/components/ui/title1";
import { checkAuth, checkIsAdmin } from "@/lib/helpers";
import { getDirectories } from "../directories/_db/db-queries";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ListDirectories from "../directories/_components/view/ListDirectories";
import Link from "next/link";
import { URLS } from "@/app/urls";

const DashboardPage = async () => {
  const session = await checkAuth();
  const isAdmin = await checkIsAdmin();
  const directories = await getDirectories({
    userId: session.user?.id,
    page: 1,
    pageSize: 9999,
  });

  return (
    <div className="pt-3 px-2">
      <Title1 className="truncate">
        <SidebarTrigger /> Dashboard
      </Title1>

      {isAdmin && (
        <div>
          <Link href={URLS.ui}>UI guidelines</Link>
        </div>
      )}

      <ListDirectories directories={directories.toObject()} />
    </div>
  );
};

export default DashboardPage;

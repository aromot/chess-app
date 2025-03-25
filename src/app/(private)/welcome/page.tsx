import Title1 from "@/components/ui/title1";
import { checkAuth } from "@/lib/helpers";
import { getDirectories } from "../directories/_db/db-queries";
import ButtonAddDirectory from "../directories/_components/add/ButtonAddDirectory";
import DirectoryProvider from "../directories/_components/DirectoryProvider";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../directories/columns";
import ModalEditDirectory from "../directories/_components/edit/ModalEditDirectory";
import ModalDeleteDirectory from "../directories/_components/delete/ModalDeleteDirectory";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardPage = async () => {
  await checkAuth();
  const directories = await getDirectories();

  return (
    <div className="pt-3 px-2">
      <Title1>
        <SidebarTrigger /> Your dashboard
      </Title1>

      <div className="container mx-auto my-10 px-20 w-[80%]">
        <div className="flex justify-between items-center mb-4">
          <Title1>Your repertoires</Title1>
          {directories.length > 0 && <ButtonAddDirectory />}
        </div>
        <DirectoryProvider>
          <DataTable
            columns={columns}
            data={directories}
            noDataEntry={
              <div className="py-5 space-y-5">
                <div>No repertoire saved for the moment</div>
                <ButtonAddDirectory />
              </div>
            }
          />
          <ModalEditDirectory />
          <ModalDeleteDirectory />
        </DirectoryProvider>
      </div>
    </div>
  );
};

export default DashboardPage;

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getDirectories } from "@/app/directories/_db/db-queries";
import ButtonAddDirectory from "@/app/directories/_components/add/ButtonAddDirectory";
import Title1 from "@/components/ui/title1";
import ModalEditDirectory from "@/app/directories/_components/edit/ModalEditDirectory";
import DirectoryProvider from "@/app/directories/_components/DirectoryProvider";
import ModalDeleteDirectory from "@/app/directories/_components/delete/ModalDeleteDirectory";
import { checkAuth } from "@/lib/helpers";

export default async function DirectoriesPage() {
  await checkAuth();
  const directories = await getDirectories();

  return (
    <div className="container mx-auto my-10 px-20 w-[80%]">
      <div className="flex justify-between items-center mb-4">
        <Title1>Liste des répertoires</Title1>
        {directories.length > 0 && <ButtonAddDirectory />}
      </div>
      <DirectoryProvider>
        <DataTable
          columns={columns}
          data={directories}
          noDataEntry={
            <div className="py-5 space-y-5">
              <div>Aucun répertoire pour le moment</div>
              <ButtonAddDirectory />
            </div>
          }
        />
        <ModalEditDirectory />
        <ModalDeleteDirectory />
      </DirectoryProvider>
    </div>
  );
}

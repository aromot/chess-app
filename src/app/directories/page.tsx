import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getDirectories } from "@/directories/db-queries";
import ButtonAddDirectory from "@/directories/components/add/ButtonAddDirectory";
import Title1 from "@/components/ui/title1";
import ModalEditDirectory from "@/directories/components/edit/ModalEditDirectory";
import DirectoryProvider from "@/directories/components/DirectoryProvider";
import ModalDeleteDirectory from "@/directories/components/delete/ModalDeleteDirectory";

export default async function DirectoriesPage() {
  const directories = await getDirectories();

  return (
    <div className="container mx-auto my-10 px-20 w-[80%]">
      <div className="flex justify-between items-center mb-4">
        <Title1>Liste des répertoires</Title1>
        <ButtonAddDirectory />
      </div>
      <DirectoryProvider>
        <DataTable columns={columns} data={directories} />
        <ModalEditDirectory />
        <ModalDeleteDirectory />
      </DirectoryProvider>
    </div>
  );
}

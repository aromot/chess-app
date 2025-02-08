import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getDirectories } from "@/directories/db-queries";
import ButtonAddDirectory from "@/directories/components/ButtonAddDirectory";

export default async function DirectoriesPage() {
  const directories = await getDirectories();

  return (
    <div className="container mx-auto my-10 px-20 w-[80%]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Liste des répertoires</h1>
        <ButtonAddDirectory />
      </div>
      <DataTable columns={columns} data={directories} />
    </div>
  );
}

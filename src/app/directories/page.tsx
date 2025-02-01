import { DataTable } from "@/components/ui/data-table";
import { columns, Directory } from "./columns";

async function getData(): Promise<Directory[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Mon répertoire e4",
    },
    {
      id: 2,
      name: "Mon répertoire d4",
    },
    {
      id: 3,
      name: "ma défense Sicilienne e4-c5",
    },
  ];
}

const DirectoryPage = async () => {
  const data = await getData();

  return (
    <div>
      Ici la liste des répertoires
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default DirectoryPage;

import Title1 from "@/components/ui/title1";
import ButtonAddDirectory from "../add/ButtonAddDirectory";
import { useDirectory } from "../DirectoryProvider";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import ModalEditDirectory from "../edit/ModalEditDirectory";
import ModalDeleteDirectory from "../delete/ModalDeleteDirectory";
import MessageEmpty from "./MessageEmpty";

const DirectoriesDatagrid = () => {
  const { directories } = useDirectory();

  return (
    <div className="mx-auto my-10 max-w-screen-sm">
      <div className="flex justify-between items-center mb-4">
        <Title1>Your repertoires</Title1>
        {directories.length > 0 && <ButtonAddDirectory />}
      </div>
      <DataTable
        columns={columns}
        data={directories}
        noDataEntry={
          <div className="py-5 space-y-5">
            <MessageEmpty />
          </div>
        }
      />
    </div>
  );
};

export default DirectoriesDatagrid;

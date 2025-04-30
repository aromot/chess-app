import Title1 from "@/components/ui/title1";
import ButtonAddDirectory from "../add/ButtonAddDirectory";
import { useDirectory } from "../DirectoryProvider";
import { columns } from "./columns";
import MessageEmpty from "./MessageEmpty";
import { PaginatedDataTable } from "@/components/ui/paginated-data-table";

const DirectoriesDatagrid = () => {
  const { directories } = useDirectory();

  return (
    <div className="mx-auto my-10 max-w-screen-lg">
      <div className="flex justify-between items-center mb-4">
        <Title1>Your repertoires</Title1>
        {directories.length > 0 && <ButtonAddDirectory />}
      </div>
      <PaginatedDataTable
        columns={columns}
        data={directories.data}
        noDataEntry={
          <div className="py-5 space-y-5">
            <MessageEmpty />
          </div>
        }
        pageSize={10}
      />
    </div>
  );
};

export default DirectoriesDatagrid;

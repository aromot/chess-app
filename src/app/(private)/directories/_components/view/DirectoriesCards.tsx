import { ComponentProps } from "react";
import { useDirectory } from "../DirectoryProvider";
import MessageEmpty from "./MessageEmpty";
import { cn } from "@/lib/utils";
import { formatUrl } from "@/lib/helpers";
import { URLS } from "@/app/urls";
import { formatDateTime } from "@/lib/i18n";
import Link from "next/link";
import ButtonEditDirectory from "../edit/ButtonEditDirectory";
import ButtonTrain from "../train/ButtonTrain";
import ButtonDeleteDirectory from "../delete/ButtonDeleteDirectory";
import ButtonAddDirectory from "../add/ButtonAddDirectory";

const DirCard = ({ className, children, ...props }: ComponentProps<"div">) => {
  return (
    <div className={cn("bg-zinc-800 p-3 rounded-md", className)} {...props}>
      {children}
    </div>
  );
};

const DirectoriesCards = () => {
  const { directories } = useDirectory();

  if (directories.length === 0) {
    return (
      <div className="mt-3">
        <DirCard>
          <div className="my-8 text-center">
            <MessageEmpty />
          </div>
        </DirCard>
      </div>
    );
  }
  return (
    <div className="mt-3 space-y-2">
      {directories.data.map((directory, i) => {
        return (
          <DirCard key={i}>
            <div className="text-2xl truncate">
              <Link
                className="underline"
                href={formatUrl(URLS.editDirectory, { id: directory.id })}
              >
                {directory.name}
              </Link>
            </div>
            <div className="text-sm flex">
              <div className="flex-1">
                {directory.white ? "white" : "black"}
              </div>
              <div>added on {formatDateTime(directory.createdAt)}</div>
            </div>
            <div className="flex mt-3">
              <div className="flex-1 flex gap-10">
                <ButtonEditDirectory variant="default" directory={directory} />
                <ButtonTrain variant="default" directory={directory} />
              </div>
              <ButtonDeleteDirectory directory={directory} />
            </div>
          </DirCard>
        );
      })}
      <div className="text-center py-5">
        <ButtonAddDirectory />
      </div>
    </div>
  );
};

export default DirectoriesCards;

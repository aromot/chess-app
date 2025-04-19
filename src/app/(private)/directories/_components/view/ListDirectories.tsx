"use client";

import DirectoryProvider from "../DirectoryProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import DirectoriesCards from "./DirectoriesCards";
import DirectoriesDatagrid from "./DirectoriesDatagrid";
import Spinner from "@/components/loaders/Spinner";
import ModalEditDirectory from "../edit/ModalEditDirectory";
import ModalDeleteDirectory from "../delete/ModalDeleteDirectory";
import ButtonAddDirectory from "../add/ButtonAddDirectory";
import { Directory } from "../../../../../../prisma/generated/client";
import { PaginatorObjectType } from "@/lib/dal/Paginator";

const ListDirectories = ({
  directories,
}: {
  directories: PaginatorObjectType<Directory>;
}) => {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <Spinner />;
  }

  return (
    <>
      <div className="block sm:hidden text-right">
        <ButtonAddDirectory size="sm" />
      </div>
      <DirectoryProvider directories={directories}>
        {isMobile ? <DirectoriesCards /> : <DirectoriesDatagrid />}

        <ModalEditDirectory />
        <ModalDeleteDirectory />
      </DirectoryProvider>
    </>
  );
};

export default ListDirectories;

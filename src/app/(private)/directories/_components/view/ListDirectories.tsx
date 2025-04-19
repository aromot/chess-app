"use client";

import DirectoryProvider from "../DirectoryProvider";
import DirectoriesCards from "./DirectoriesCards";
import DirectoriesDatagrid from "./DirectoriesDatagrid";
import ModalEditDirectory from "../edit/ModalEditDirectory";
import ModalDeleteDirectory from "../delete/ModalDeleteDirectory";
import { Directory } from "../../../../../../prisma/generated/client";
import { PaginatorObjectType } from "@/lib/dal/Paginator";
import { useIsMobile } from "@/app/(private)/welcome/useIsMobile";

const ListDirectories = ({
  directories,
}: {
  directories: PaginatorObjectType<Directory>;
}) => {
  const isMobile = useIsMobile();

  return (
    <DirectoryProvider directories={directories}>
      {isMobile ? <DirectoriesCards /> : <DirectoriesDatagrid />}

      <ModalEditDirectory />
      <ModalDeleteDirectory />
    </DirectoryProvider>
  );
};

export default ListDirectories;

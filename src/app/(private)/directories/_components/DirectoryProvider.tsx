"use client";

import { PaginatorObjectType } from "@/lib/dal/Paginator";
import { Directory } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface ContextInterface {
  openEdit: boolean;
  setOpenEdit: (b: boolean) => void;
  openEditDirectory: (directory: Directory) => void;
  directory: Directory | null;
  openDelete: boolean;
  setOpenDelete: (b: boolean) => void;
  openDeleteDirectory: (directory: Directory) => void;
  directories: PaginatorObjectType<Directory>;
}

const Context = createContext<ContextInterface | null>(null);

const DirectoryProvider = ({
  children,
  directories,
}: Readonly<{
  children: React.ReactNode;
  directories: PaginatorObjectType<Directory>;
}>) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [directory, setDirectory] = useState<Directory | null>(null);

  const openEditDirectory = (_directory: Directory) => {
    setOpenEdit(true);
    setDirectory(_directory);
  };

  const openDeleteDirectory = (_directory: Directory) => {
    setOpenDelete(true);
    setDirectory(_directory);
  };

  const ctx: ContextInterface = {
    openEdit,
    setOpenEdit,
    openEditDirectory,
    directory,
    openDelete,
    setOpenDelete,
    openDeleteDirectory,
    directories,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useDirectory() {
  return useContext(Context) as ContextInterface;
}

export default DirectoryProvider;

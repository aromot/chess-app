"use client";

import { createContext, useContext, useState } from "react";

const Context = createContext(null);

const DirectoryProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [directory, setDirectory] = useState();

  const openEditDirectory = (_directory) => {
    setOpenEdit(true);
    setDirectory(_directory);
  };

  const openDeleteDirectory = (_directory) => {
    setOpenDelete(true);
    setDirectory(_directory);
  };

  const ctx = {
    openEdit,
    setOpenEdit,
    openEditDirectory,
    directory,
    openDelete,
    setOpenDelete,
    openDeleteDirectory,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useDirectory() {
  return useContext(Context);
}

export default DirectoryProvider;

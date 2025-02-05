"use client";

import { createContext, useContext, useState } from "react";

interface CommentContext {
  modalDeleteOpen: boolean;
  openModalDelete: () => void;
  closeModalDelete: () => void;
  toggleModalDelete: (open: boolean) => void;
}

const Context = createContext<CommentContext | null>(null);

const CommentProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const openModalDelete = () => setModalDeleteOpen(true);
  const closeModalDelete = () => setModalDeleteOpen(false);
  const toggleModalDelete = (open: boolean) => setModalDeleteOpen(open);

  const context: CommentContext = {
    modalDeleteOpen,
    openModalDelete,
    closeModalDelete,
    toggleModalDelete,
  };

  return <Context value={context}>{children}</Context>;
};

export function useComment() {
  return useContext(Context) as CommentContext;
}

export default CommentProvider;

"use client";

import { Comment } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface CommentContext {
  modalDeleteOpen: boolean;
  openModalDelete: (comment: Comment) => void;
  closeModalDelete: () => void;
  toggleModalDelete: (open: boolean) => void;
  commentDelete: Comment | undefined;
  modalEditOpen: boolean;
  openModalEdit: (comment: Comment) => void;
  closeModalEdit: () => void;
  toggleModalEdit: (open: boolean) => void;
  commentEdit: Comment | undefined;
}

const Context = createContext<CommentContext | null>(null);

const CommentProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [commentDelete, setCommentDelete] = useState<Comment>();
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [commentEdit, setCommentEdit] = useState<Comment>();

  const openModalDelete = (comment: Comment) => {
    setCommentDelete(comment);
    setModalDeleteOpen(true);
  };
  const closeModalDelete = () => {
    setCommentDelete(undefined);
    setModalDeleteOpen(false);
  };
  const toggleModalDelete = (open: boolean) => setModalDeleteOpen(open);

  const openModalEdit = (comment: Comment) => {
    setCommentEdit(comment);
    setModalEditOpen(true);
  };
  const closeModalEdit = () => {
    setCommentEdit(undefined);
    setModalEditOpen(false);
  };
  const toggleModalEdit = (open: boolean) => setModalEditOpen(open);

  const context: CommentContext = {
    modalDeleteOpen,
    openModalDelete,
    closeModalDelete,
    toggleModalDelete,
    commentDelete,
    modalEditOpen,
    openModalEdit,
    closeModalEdit,
    toggleModalEdit,
    commentEdit,
  };

  return <Context value={context}>{children}</Context>;
};

export function useComment() {
  return useContext(Context) as CommentContext;
}

export default CommentProvider;

"use client";

import { Comment } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface CommentContext {
  modalDeleteOpen: boolean;
  openModalDelete: (comment: Comment) => void;
  closeModalDelete: () => void;
  toggleModalDelete: (open: boolean) => void;
  commentDelete: Comment;
}

const Context = createContext<CommentContext | null>(null);

const CommentProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [commentDelete, setCommentDelete] = useState<Comment>();

  const openModalDelete = (comment: Comment) => {
    setCommentDelete(comment);
    setModalDeleteOpen(true);
  };
  const closeModalDelete = () => {
    setCommentDelete(undefined);
    setModalDeleteOpen(false);
  };
  const toggleModalDelete = (open: boolean) => setModalDeleteOpen(open);

  const context: CommentContext = {
    modalDeleteOpen,
    openModalDelete,
    closeModalDelete,
    toggleModalDelete,
    commentDelete,
  };

  return <Context value={context}>{children}</Context>;
};

export function useComment() {
  return useContext(Context) as CommentContext;
}

export default CommentProvider;

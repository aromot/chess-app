"use client";

import { createContext, useContext } from "react";

type CommentContext = {
  modalDeleteOpen: boolean;
};

const Context = createContext<CommentContext | null>(null);

const CommentProvider = ({ children }) => {
  const context: CommentContext = {
    modalDeleteOpen: false,
  };

  return <Context value={context}>{children}</Context>;
};

export function useComment() {
  return useContext(Context);
}

export default CommentProvider;

"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useComment } from "./CommentProvider";

const DeleteMenuItem = () => {
  const { modalDeleteOpen } = useComment();

  console.log({ modalDeleteOpen });

  return <DropdownMenuItem>Supprimer</DropdownMenuItem>;
};

export default DeleteMenuItem;

"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useComment } from "./CommentProvider";

const DeleteMenuItem = () => {
  const { openModalDelete } = useComment();

  return (
    <DropdownMenuItem onClick={openModalDelete}>Supprimer</DropdownMenuItem>
  );
};

export default DeleteMenuItem;

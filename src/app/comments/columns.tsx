"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Directory = {
  id: number;
  name: string;
};

export const columns: ColumnDef<Directory>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "content",
    header: "Commentaire",
  },
  {
    accessorKey: "createdAt",
    header: "Date d'ajout",
  },
];

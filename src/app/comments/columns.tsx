"use client";

import { formatDateTime } from "@/lib/i18n";
import { ColumnDef } from "@tanstack/react-table";
import nl2br from "react-br";

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
    cell: ({ renderValue }) => nl2br(renderValue()),
  },
  {
    accessorKey: "createdAt",
    header: "Date d'ajout",
    cell: ({ renderValue }) => formatDateTime(renderValue() as string),
  },
];

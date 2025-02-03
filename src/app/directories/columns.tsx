"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/i18n";
export type Directory = {
  id: number;
  name: string;
  white: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<Directory>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "white",
    header: "Couleur",
    cell: ({ row }) => (row.original.white ? "Blanc" : "Noir"),
  },
  {
    accessorKey: "createdAt",
    header: "Date d'ajout",
    cell: ({ renderValue }) => formatDateTime(renderValue() as string),
  },
];

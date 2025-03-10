"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/i18n";
import { Directory } from "@prisma/client";
import ButtonEditDirectory from "@/app/directories/_components/edit/ButtonEditDirectory";
import ButtonDeleteDirectory from "@/app/directories/_components/delete/ButtonDeleteDirectory";
import Link from "next/link";

export const columns: ColumnDef<Directory>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ renderValue, row }) => (
      <Link href={`/directories/${row.original.id}`}>{renderValue()}</Link>
    ),
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
  {
    id: "actions",
    maxSize: 50,
    cell: ({ row }) => {
      const directory = row.original as Directory;
      return (
        <div className="flex gap-3">
          <ButtonEditDirectory directory={directory} />
          <ButtonDeleteDirectory directory={directory} />
        </div>
      );
    },
  },
];

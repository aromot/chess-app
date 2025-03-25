"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/i18n";
import { Directory } from "@prisma/client";
import Link from "next/link";
import ButtonEditDirectory from "./_components/edit/ButtonEditDirectory";
import ButtonDeleteDirectory from "./_components/delete/ButtonDeleteDirectory";
import { formatUrl } from "@/lib/helpers";
import { URLS } from "@/app/urls";
import { Button } from "@/components/ui/button";
import ButtonTrain from "./_components/train/ButtonTrain";

export const columns: ColumnDef<Directory>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ renderValue, row }) => (
      <Link href={formatUrl(URLS.editDirectory, { id: row.original.id })}>
        {renderValue()}
      </Link>
    ),
  },
  {
    accessorKey: "white",
    header: "Play as",
    cell: ({ row }) => (row.original.white ? "Blanc" : "Noir"),
  },
  {
    accessorKey: "createdAt",
    header: "Added on",
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
          <ButtonTrain directory={directory} />
          <ButtonDeleteDirectory directory={directory} />
        </div>
      );
    },
  },
];

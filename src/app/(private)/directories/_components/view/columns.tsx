"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/i18n";
import { Directory } from "@prisma/client";
import Link from "next/link";
import ButtonEditDirectory from "../edit/ButtonEditDirectory";
import ButtonDeleteDirectory from "../delete/ButtonDeleteDirectory";
import { formatUrl } from "@/lib/helpers";
import { URLS } from "@/app/urls";
import ButtonTrain from "../train/ButtonTrain";
import { ReactNode } from "react";

export const columns: ColumnDef<Directory>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ renderValue, row }) => (
      <Link href={formatUrl(URLS.editDirectory, { id: row.original.id })}>
        {renderValue() as ReactNode}
      </Link>
    ),
  },
  {
    accessorKey: "white",
    header: "Color",
    cell: ({ row }) => (row.original.white ? "white" : "black"),
  },
  {
    accessorKey: "createdAt",
    header: "Added on",
    cell: ({ renderValue }) => formatDateTime(renderValue() as string),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated on",
    cell: ({ renderValue }) => formatDateTime(renderValue() as string),
  },
  {
    id: "actions",
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

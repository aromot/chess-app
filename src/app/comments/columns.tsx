"use client";

import { formatDateTime } from "@/lib/i18n";
import { Comment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import nl2br from "react-br";

export const columns: ColumnDef<Comment>[] = [
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

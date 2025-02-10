"use client";

import ButtonDeleteComment from "@/comments/components/delete/ButtonDeleteComment";
import ButtonEditComment from "@/comments/components/edit/ButtonEditComment";
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
    maxSize: 50,
    cell: ({ renderValue }) => formatDateTime(renderValue() as string),
  },
  {
    id: "actions",
    maxSize: 50,
    cell: ({ row }) => {
      const comment = row.original as Comment;

      return (
        <div className="flex gap-3">
          <ButtonEditComment comment={comment} />
          <ButtonDeleteComment comment={comment} />
        </div>
      );
    },
  },
];

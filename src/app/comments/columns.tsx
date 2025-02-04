"use client";

import DeleteMenuItem from "@/comments/components/DeleteMenuItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/i18n";
import { Comment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
    size: 50,
    cell: ({ renderValue }) => formatDateTime(renderValue() as string),
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => {
      const comment = row.original as Comment;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(comment.id.toString())
              }
            >
              Copier l&apos;identifiant
            </DropdownMenuItem>
            <DropdownMenuItem>Modifier</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

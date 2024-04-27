"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type DB } from "~/server/db/types";

import { DeletePost } from "../delete";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Post = Omit<DB["post"], "id" | "created_at"> & {
  id: number;
  created_at: Date;
  updated_at: Date;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Post",
  },
  {
    accessorKey: "created_at",
    accessorFn: (row) => {
      return row.created_at.toLocaleTimeString();
    },
    header: "Created At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row: { original } }) => {
      return (
        <DropdownMenu key={`action-posts-table-${original.id}`}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeletePost post={original}>Delete</DeletePost>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

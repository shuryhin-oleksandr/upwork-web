"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Room } from "@/lib/api";

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "roomName",
    header: "Client",
    cell: ({ row }) => row.original.roomName ?? "—",
  },
  {
    accessorKey: "topic",
    header: "Job",
    cell: ({ row }) => row.original.topic || "—",
  },
];

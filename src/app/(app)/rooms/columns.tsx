"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Room } from "@/lib/api";

function UpworkLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "roomName",
    header: "Client",
    cell: ({ row }) => {
      const roomName = row.original.roomName;
      if (!roomName) return "—";
      return <UpworkLink href={row.original.roomUrl}>{roomName}</UpworkLink>;
    },
  },
  {
    accessorKey: "topic",
    header: "Job",
    cell: ({ row }) => {
      const { topic, jobUrl } = row.original;
      if (!topic) return "—";
      if (!jobUrl) return topic;
      return <UpworkLink href={jobUrl}>{topic}</UpworkLink>;
    },
  },
  {
    accessorKey: "nextFollowUpNumber",
    header: "FU#",
    cell: ({ row }) => row.original.nextFollowUpNumber || "—",
  },
  {
    accessorKey: "nextFollowUpDate",
    header: "FU date",
    cell: ({ row }) => {
      const nextFollowUpDate = row.original.nextFollowUpDate;
      if (!nextFollowUpDate) return "—";
      return new Date(nextFollowUpDate).toLocaleDateString();
    },
  },
];

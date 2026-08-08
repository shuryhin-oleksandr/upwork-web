"use client";

import useSWR from "swr";
import { AlertCircleIcon } from "lucide-react";
import { getRooms } from "@/lib/api";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function RoomsPage() {
  const { data, error, isLoading, mutate } = useSWR("/rooms", getRooms);

  if (error)
    return (
      <Empty className="min-h-svh">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle>Couldn&apos;t load your rooms</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t reach Upwork to fetch your rooms. This is usually
            temporary — please try again.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => mutate()}>Try again</Button>
        </EmptyContent>
      </Empty>
    );

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </div>
  );
}

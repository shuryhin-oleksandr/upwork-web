"use client";

import useSWR from "swr";
import { getCurrentUser } from "@/lib/api";

export default function UserInfo() {
  const { data, error, isLoading } = useSWR("/users/me", getCurrentUser);

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return (
      <p className="text-destructive">
        {error instanceof Error ? error.message : "Request failed"}
      </p>
    );

  if (!data) return null;

  return (
    <>
      <p>
        <span className="text-muted-foreground">Email: </span>
        {data.email}
      </p>
      <p>
        <span className="text-muted-foreground">ID: </span>
        {data.id}
      </p>
    </>
  );
}

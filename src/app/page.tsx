"use client";

import useSWR from "swr";
import { api } from "@/lib/api";

export default function Home() {
  const { data, error, isLoading } = useSWR("/users/me", async () => {
    const { data, error } = await api.POST("/users/me", {});
    if (error) throw error;
    return data;
  });

  return (
    <div className="p-8 flex flex-col gap-2 max-w-full overflow-hidden">
      <h1 className="text-2xl font-bold">Welcome</h1>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-destructive">
          {typeof (error as { detail?: unknown })?.detail === "string"
            ? (error as { detail: string }).detail
            : "Request failed"}
        </p>
      )}
      {data && (
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
      )}
      <div className="mt-4">
        <p className="text-muted-foreground">
          document.cookie @ localhost:3000:
        </p>
        {typeof document !== "undefined" && document.cookie ? (
          document.cookie.split("; ").map((c) => (
            <p key={c}>
              <code>{c}</code>
            </p>
          ))
        ) : (
          <p>
            <code>(empty)</code>
          </p>
        )}
      </div>
    </div>
  );
}

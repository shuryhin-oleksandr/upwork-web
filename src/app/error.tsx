"use client";

import { useEffect } from "react";
import { AlertCircleIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Empty className="min-h-svh">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t load this page. This is usually temporary — please try
          again in a moment.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => unstable_retry()}>Try again</Button>
      </EmptyContent>
    </Empty>
  );
}

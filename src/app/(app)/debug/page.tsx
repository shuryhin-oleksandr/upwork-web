import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export default async function DebugPage() {
  await requireAuth();

  return (
    <Container className="py-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Debug</h1>
      <p className="text-muted-foreground">This is a debug page.</p>
      <Button asChild variant="outline" className="w-fit">
        <Link href="/">Back to home</Link>
      </Button>
    </Container>
  );
}

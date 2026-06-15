import Link from "next/link";

export default function LoginFailPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Sign in failed</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t sign you in. Your Upwork account isn&apos;t linked to
          an active invitation.
        </p>
        <Link href="/login" className="underline underline-offset-4">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

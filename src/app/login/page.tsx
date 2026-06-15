import { AlertCircleIcon, GalleryVerticalEnd } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const signInFailed = error !== undefined;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Digital Brother
        </a>
        {signInFailed && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Access restricted</AlertTitle>
            <AlertDescription>
              Please contact your administrator if you believe this is a
              mistake.
            </AlertDescription>
          </Alert>
        )}
        <LoginForm />
      </div>
    </div>
  );
}

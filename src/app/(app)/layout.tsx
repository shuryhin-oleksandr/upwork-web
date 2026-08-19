import { requireAuth } from "@/lib/auth";
import Header from "./_components/header";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireAuth();

  return (
    <>
      <Header userEmail={user.email} />
      <main className="flex-1">{children}</main>
    </>
  );
}

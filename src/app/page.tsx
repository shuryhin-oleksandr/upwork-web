import { cookies } from "next/headers";
import UserInfo from "./_components/UserInfo";

export default async function Home() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  return (
    <div className="p-8 flex flex-col gap-2 max-w-full overflow-hidden">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <UserInfo />
      <div className="mt-4">
        <p className="text-muted-foreground">Cookies @ server:</p>
        {allCookies.length === 0 ? (
          <p>
            <code>(empty)</code>
          </p>
        ) : (
          allCookies.map((c) => (
            <p key={c.name}>
              <code>
                {c.name}={c.value}
              </code>
            </p>
          ))
        )}
      </div>
    </div>
  );
}

import ky from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { User } from "./api";

const SESSION_COOKIE_NAME = "session";

export const requireAuth = cache(async (): Promise<User> => {
  const cookieStore = await cookies();
  if (!cookieStore.has(SESSION_COOKIE_NAME)) redirect("/login");

  const cookieHeaderForwardedToBackend = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const apiClient = ky.create({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE,
    headers: { cookie: cookieHeaderForwardedToBackend },
    cache: "no-store",
    throwHttpErrors: false,
  });
  const currentUserResponse = await apiClient.get("users/me");
  if (currentUserResponse.status === 401) redirect("/login");
  if (!currentUserResponse.ok) {
    throw new Error(
      `Failed to load the authenticated user (${currentUserResponse.status})`,
    );
  }
  return currentUserResponse.json<User>();
});

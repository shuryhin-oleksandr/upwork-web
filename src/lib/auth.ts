import ky from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { User } from "./api";
import { HOME_PATH, LOGIN_PATH } from "./constants";

const SESSION_COOKIE_NAME = "session";

const getAuthenticatedUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  if (!cookieStore.has(SESSION_COOKIE_NAME)) return null;

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
  if (currentUserResponse.status === 401) return null;
  if (!currentUserResponse.ok) {
    throw new Error(
      `Failed to load the authenticated user (${currentUserResponse.status})`,
    );
  }
  return currentUserResponse.json<User>();
});

export const requireAuth = async (): Promise<User> => {
  const authenticatedUser = await getAuthenticatedUser();
  if (!authenticatedUser) redirect(LOGIN_PATH);
  return authenticatedUser;
};

export const requireGuest = async (): Promise<void> => {
  const authenticatedUser = await getAuthenticatedUser();
  if (authenticatedUser) redirect(HOME_PATH);
};

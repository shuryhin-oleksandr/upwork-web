import Cookies from "js-cookie";

export interface Credentials {
  email: string;
  password: string;
}

export async function login(credentials: Credentials) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    },
  );
  return response.json();
}

export interface User {
  id: string;
  email: string;
}

export async function getCurrentUser(): Promise<User> {
  const csrfToken = Cookies.get("csrftoken");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/me`, {
    credentials: "include",
    method: "POST",
    headers: csrfToken ? { "x-csrftoken": csrfToken } : undefined,
  });
  if (!response.ok) throw await response.json();
  return response.json();
}

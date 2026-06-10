import ky from "ky";
import Cookies from "js-cookie";

const CSRF_SAFE_HTTP_METHODS = new Set(["GET", "HEAD", "OPTIONS", "TRACE"]);

export const apiClient = ky.create({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE,
  credentials: "include",
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const isCsrfSafe = CSRF_SAFE_HTTP_METHODS.has(
          request.method.toUpperCase(),
        );
        if (isCsrfSafe) return;

        const csrfToken = Cookies.get("csrftoken");
        if (!csrfToken) return;

        request.headers.set("x-csrftoken", csrfToken);
      },
    ],
  },
});

export interface Credentials {
  email: string;
  password: string;
}

export function login(credentials: Credentials) {
  return apiClient.post("/auth/login", { json: credentials }).json();
}

export interface User {
  id: string;
  email: string;
}

export function getCurrentUser() {
  return apiClient.get("/users/me").json<User>();
}

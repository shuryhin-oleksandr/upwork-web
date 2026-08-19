import ky from "ky";
import Cookies from "js-cookie";
import { LOGIN_PATH } from "./constants";

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
    afterResponse: [
      ({ response }) => {
        if (response.status !== 401) return;
        if (window.location.pathname === LOGIN_PATH) return;

        window.location.assign(LOGIN_PATH);
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

export interface Room {
  id: string;
  roomName: string | null;
  topic: string | null;
  roomUrl: string;
  jobUrl: string | null;
  nextFollowUpNumber: number;
  nextFollowUpDate: string | null;
}

export function getRooms() {
  return apiClient.get("/rooms").json<Room[]>();
}

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

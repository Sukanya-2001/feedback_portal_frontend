"use server";

import { cookies } from "next/headers";

export async function setCookieValue(key: string, value: string | number) {
  const cookieStore = await cookies(); 

  cookieStore.set(key, String(value), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}


export async function getCookieValue(key: string){
  const cookieStore = await cookies();
  return cookieStore?.get(key)?.value;
}

export async function deleteCookieValue(key: string) {
  const cookieStore = await cookies();
  cookieStore?.delete(key);
}
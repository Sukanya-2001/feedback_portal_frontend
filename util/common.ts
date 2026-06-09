import { setCookie } from "nookies";

export const setCookieClient = (key: string, value: string) => {
  setCookie(null, key, value, {
    path: "/",
  });
};

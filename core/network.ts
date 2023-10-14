import { request, type RequestOptions } from "urllib";
import { ValueOf } from "../types";
import { BASE_URL, COOKIES, ROUTES } from "./constants";

async function get<T = unknown>(route: string, token: string, options: RequestInit = undefined) {
  const url = new URL(route, BASE_URL);
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      cookie: `${COOKIES.AUTH}=${token}`
    },
    redirect: "manual",
  });

  return {
    sucess: response.ok,
    data: await response.json() as T
  }
}

async function post(route: ValueOf<typeof ROUTES>, options: RequestOptions = undefined) {
  const url = new URL(route, BASE_URL);

  return await request(url, {
    ...options,
    method: "POST",
    headers: {
      ...options.headers,
      "content-type": "application/x-www-form-urlencoded",
      origin: BASE_URL
    },
    maxRedirects: 0
  });
}

export const api = { get, post };
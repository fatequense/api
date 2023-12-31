import { request, type RequestOptions } from "urllib";
import { ValueOf } from "../types";
import { BASE_URL, COOKIES, ROUTES } from "./constants";

async function get(route: ValueOf<typeof ROUTES>, token: string, options: RequestOptions = undefined) {
  const url = new URL(route, BASE_URL);
  const response = await request(url, {
    ...options,
    headers: {
      ...options?.headers,
      cookie: `${COOKIES.AUTH}=${token}`
    },
    maxRedirects: 0,
  });

  return {
    sucess: response.status === 200,
    res: response
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
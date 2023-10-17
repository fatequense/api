import { request, type RequestOptions } from "urllib";
import { ValueOf } from "../types";
import { BASE_URL, COOKIES, ROUTES } from "./constants";

type Route = ValueOf<typeof ROUTES>;

async function get(route: Route, token: string, options: RequestOptions = undefined) {
  const url = new URL(route, BASE_URL);
  const response = await request(url, {
    ...options,
    headers: {
      ...options?.headers,
      cookie: `${COOKIES.AUTH}=${decrypt(token)}`
    },
    maxRedirects: 0,
  });

  return {
    sucess: response.status === 200,
    res: response
  }
}

async function post(route: Route, options: RequestOptions = undefined) {
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
import { STATUS } from "~/core/constants";
import { api, type Route } from "~/core/network";
import { ParsedHtml, parseHtml } from "~/core/scrap";
import { AccessDeniedError } from "~/errors/exceptions/siga.error";

type Props<T> = {
	route: Route,
	scrapFn: (html: ParsedHtml) => T
	token: string
}

export async function scrap<T = unknown>({ route, scrapFn, token }: Props<T>) {
  const { res } = await api.get(route, token);
  
  if (res.status === STATUS.REDIRECT) throw new AccessDeniedError();

  const html = await parseHtml(res.data);
  return scrapFn(html);
}
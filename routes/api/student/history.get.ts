import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapHistory } from "~/core/scrapers/history.scraper";
import { AccessDeniedError } from "~/errors/exceptions/siga.error";

export default defineEventHandler(async (event) => {
  const { res } = await api.get("/aluno/historicocompleto.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new AccessDeniedError();

  const html = await parseHtml(res.data);

  return scrapHistory(html);
});
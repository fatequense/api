import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapHistory } from "~/core/scrapers/history.scraper";

export default defineEventHandler(async (event) => {
  const { res } = await api.get("/aluno/historicocompleto.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new Error("Failed to get history.");

  const html = await parseHtml(res.data);
  const history = scrapHistory(html);

  return { history };
});
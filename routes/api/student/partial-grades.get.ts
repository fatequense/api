import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapPartialGrades } from "~/core/scrapers/partial-grades.scraper";

export default defineEventHandler(async (event) => {
  const { res } = await api.get("/aluno/notasparciais.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new Error("Failed to get partial grades.");

  const html = await parseHtml(res.data);
  const partialGrades = scrapPartialGrades(html);

  return { partialGrades };
});
import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapPartialAbsences } from "~/core/scrapers/partial-absences.scraper";

export default defineEventHandler(async (event) => {
  const { res } = await api.get("/aluno/faltasparciais.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new Error("Failed to get partial absences.");

  const html = await parseHtml(res.data);
  const partialAbsences = scrapPartialAbsences(html);

  return { partialAbsences };
});
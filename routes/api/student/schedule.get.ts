import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapSchedule } from "~/core/scrapers/schedule.scraper";

export default defineEventHandler(async (event) => {
  const { res } = await api.get("/aluno/horario.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new Error("Failed to get schedule.");

  const html = await parseHtml(res.data);
  const schedule = scrapSchedule(html);

  return { schedule };
});
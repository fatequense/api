import { scrapSchedule } from "~/core/scrapers/schedule.scraper";

export default defineEventHandler(async (event) => {
  return await scrap({
    route: "/aluno/horario.aspx",
    scrapFn: scrapSchedule,
    token: event.context.token
  })
});
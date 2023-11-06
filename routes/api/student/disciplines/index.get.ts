import { scrapDisciplines } from "~/core/scrapers/disciplines.scraper";

export default defineEventHandler(async (event) => {
  return await scrap({
    route: "/aluno/notasparciais.aspx",
    scrapFn: scrapDisciplines,
    token: event.context.token
  })
});
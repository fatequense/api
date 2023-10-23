import { scrapPartialAbsences } from "~/core/scrapers/partial-absences.scraper";

export default defineEventHandler(async (event) => {
  return await scrap({
    route: "/aluno/faltasparciais.aspx",
    scrapFn: scrapPartialAbsences,
    token: event.context.token
  })
});
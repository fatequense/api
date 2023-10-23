import { scrapPartialGrades } from "~/core/scrapers/partial-grades.scraper";

export default defineEventHandler(async (event) => {
  return await scrap({
    route: "/aluno/notasparciais.aspx",
    scrapFn: scrapPartialGrades,
    token: event.context.token
  })
});
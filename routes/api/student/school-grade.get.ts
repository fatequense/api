import { scrapSchoolGrade } from "~/core/scrapers/school-grade.scraper";

export default defineEventHandler(async (event) => {
  return await scrap({
    route: "/aluno/historicograde.aspx",
    scrapFn: scrapSchoolGrade,
    token: event.context.token
  })
});
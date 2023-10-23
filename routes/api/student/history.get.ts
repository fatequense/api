import { scrapHistory } from "~/core/scrapers/history.scraper";

export default defineEventHandler(async (event) => {
  return await scrap({
    route: "/aluno/historicocompleto.aspx",
    scrapFn: scrapHistory,
    token: event.context.token
  });
});
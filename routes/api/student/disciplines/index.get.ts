import { scrapDisciplines } from "~/core/scrapers/disciplines.scraper";
import { AccessDeniedError } from "~/errors/exceptions/siga.error";
import { sigaDisciplines } from "~/utils/siga";

export default defineEventHandler(async (event) => {
  const disciplines = await sigaDisciplines(event.context.user)

  if (!disciplines.success) throw new AccessDeniedError()

  return disciplines.data
});
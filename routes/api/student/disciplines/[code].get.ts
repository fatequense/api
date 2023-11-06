import { object, required, string, parse } from "valibot";
import { scrapDiscipline } from "~/core/scrapers/discipline.scraper";

const disciplineParamsSchema = required(object({
	code: string()
}));

export default defineEventHandler(async (event) => {
	const { code: disciplineCode } = parse(disciplineParamsSchema, event.context.params);

  return await scrap({
		// @ts-ignore
    route: `/aluno/planoensino.aspx?${disciplineCode}`,
    scrapFn: scrapDiscipline,
    token: event.context.token
  })
});
import { parse } from "valibot";
import type { ParsedHtml } from "../scrap";
import { disciplinesMinifySchema } from "~/lib/validations/discipline";

export function scrapDisciplines({ $ }: ParsedHtml) {
	const disciplinesRaw = JSON.parse($('input[name="Grid4ContainerDataV"]').attr('value'))

	if (!Array.isArray(disciplinesRaw)) return null

	const disciplines = disciplinesRaw
		.map(a => ({ code: a.at(5), name: a.at(7) }));

	return parse(disciplinesMinifySchema, disciplines)
}


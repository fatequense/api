import { object, required, string, parse } from "valibot";
import { AccessDeniedError } from "~/errors/exceptions/siga.error";
import { sigaDiscipline } from "~/utils/siga";

const disciplineParamsSchema = required(object({
	code: string()
}));

export default defineEventHandler(async (event) => {
	const { code: disciplineCode } = parse(disciplineParamsSchema, event.context.params);

  const discipline = await sigaDiscipline(disciplineCode, event.context.user)

  if (!discipline.success) throw new AccessDeniedError()

  return discipline.data
});
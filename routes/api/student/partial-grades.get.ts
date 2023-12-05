import { AccessDeniedError } from "~/errors/exceptions/siga.error";
import { sigaPartialGrades } from "~/utils/siga";

export default defineEventHandler(async (event) => {
  const partialGrades = await sigaPartialGrades(event.context.user)

  if (!partialGrades.success) throw new AccessDeniedError()

  return partialGrades.data
});
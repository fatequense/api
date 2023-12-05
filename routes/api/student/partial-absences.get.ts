import { AccessDeniedError } from "~/errors/exceptions/siga.error";
import { sigaPartialAbsences } from "~/utils/siga";

export default defineEventHandler(async (event) => {
  const partialAbsences = await sigaPartialAbsences(event.context.user)

  if (!partialAbsences.success) throw new AccessDeniedError()

  return partialAbsences.data
});
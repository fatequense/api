import { AccessDeniedError } from "~/errors/exceptions/siga.error";
import { sigaHistory } from "~/utils/siga";

export default defineEventHandler(async (event) => {
  const history = await sigaHistory(event.context.user)

  if (!history.success) throw new AccessDeniedError()

  return history.data
});
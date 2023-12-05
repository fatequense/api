import { AccessDeniedError } from "~/errors/exceptions/siga.error";
import { sigaSchedule } from "~/utils/siga";

export default defineEventHandler(async (event) => {
  const schedule = await sigaSchedule(event.context.user)

  if (!schedule.success) throw new AccessDeniedError()

  return schedule.data
});
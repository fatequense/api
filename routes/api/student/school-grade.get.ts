import { AccessDeniedError } from "~/errors/exceptions/siga.error";
import { sigaSchoolGrade } from "~/utils/siga";

export default defineEventHandler(async (event) => {
  const schoolGrade = await sigaSchoolGrade(event.context.user)

  if (!schoolGrade.success) throw new AccessDeniedError()

  return schoolGrade.data
});
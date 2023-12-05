import { eq } from "drizzle-orm";

import { db } from "~/db";
import { students } from "~/db/schema";
import { AccessDeniedError } from "~/errors/exceptions/siga.error";

export default defineEventHandler(async (event) => {
  const scrapedProfile = await sigaProfile(event.context.user)

  if (!scrapedProfile.success) throw new AccessDeniedError()

  const student = await db
    .select()
    .from(students)
    .where(eq(students.id, scrapedProfile.data.ra))
  
  if (student.length === 1) {
    Object.assign(scrapedProfile.data, {
      avatarUrl: student[0].avatarUrl,
    })
  }

  return scrapedProfile.data
});
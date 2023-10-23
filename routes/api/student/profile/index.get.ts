import { eq } from "drizzle-orm";

import { db } from "~/db";
import { students } from "~/db/schema";
import { scrapProfile } from "~/core/scrapers/profile.scraper";

export default defineEventHandler(async (event) => {
  const scrapedProfile = await scrap({
    route: "/aluno/home.aspx",
    scrapFn: scrapProfile,
    token: event.context.token
  })

  const student = await db
    .select()
    .from(students)
    .where(eq(students.id, scrapedProfile.ra))
  
  if (student.length === 1) {
    Object.assign(scrapedProfile, {
      avatarUrl: student[0].avatarUrl,
    })
  }

  return scrapedProfile
});
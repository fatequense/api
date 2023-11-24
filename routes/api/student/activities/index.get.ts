import { eq } from "drizzle-orm"
import { scrapProfile } from "~/core/scrapers/profile.scraper"
import { db } from "~/db"
import { activities } from "~/db/schema"

export default defineEventHandler(async (event) => {
	const scrapedProfile = await scrap({
    route: "/aluno/home.aspx",
    scrapFn: scrapProfile,
    token: event.context.token
  })

	const allActivities = await db
		.select()
		.from(activities)
		.where(eq(activities.studentId, scrapedProfile.ra))
	
	return allActivities
})
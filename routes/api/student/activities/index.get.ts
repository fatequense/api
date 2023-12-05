import { eq } from "drizzle-orm"
import { scrapProfile } from "~/core/scrapers/profile.scraper"
import { db } from "~/db"
import { activities } from "~/db/schema"

export default defineEventHandler(async (event) => {
	const allActivities = await db
		.select()
		.from(activities)
		.where(eq(activities.studentId, event.context.user.ra))
	
	return allActivities
})
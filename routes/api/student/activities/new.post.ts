import { parse } from "valibot";
import { scrapProfile } from "~/core/scrapers/profile.scraper";
import { db } from "~/db";
import { activities } from "~/db/schema";
import { ForbiddenCreateActivityError } from "~/errors/exceptions/activity.error";
import { newActivitySchema } from "~/lib/validations/activity";

export default defineEventHandler(async (event) => {
	const scrapedProfile = await scrap({
    route: "/aluno/home.aspx",
    scrapFn: scrapProfile,
    token: event.context.token
  })

	const { studentId, disciplineCode, title, description, untilAt, isCompleted } = parse(newActivitySchema, await readBody(event));

	if (scrapedProfile.ra !== studentId) throw new ForbiddenCreateActivityError()

	await db
		.insert(activities)
		.values({
			studentId: scrapedProfile.ra,
			disciplineCode,
			title,
			description,
			isCompleted,
			untilAt: new Date(untilAt)
		})
	
	return { ok: true }
});
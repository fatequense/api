import { parse } from "valibot";
import { scrapProfile } from "~/core/scrapers/profile.scraper";
import { db } from "~/db";
import { activities } from "~/db/schema";
import { ForbiddenCreateActivityError } from "~/errors/exceptions/activity.error";
import { newActivitySchema } from "~/lib/validations/activity";

export default defineEventHandler(async (event) => {
	const { studentId, disciplineCode, title, description, untilAt, isCompleted } = parse(newActivitySchema, await readBody(event));

	if (event.context.user.ra !== studentId) throw new ForbiddenCreateActivityError()

	await db
		.insert(activities)
		.values({
			studentId: event.context.user.ra,
			disciplineCode,
			title,
			description,
			isCompleted,
			untilAt: new Date(untilAt)
		})
	
	return { ok: true }
});
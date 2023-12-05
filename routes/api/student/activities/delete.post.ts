import { eq } from "drizzle-orm";
import { parse } from "valibot";
import { db } from "~/db";
import { activities } from "~/db/schema";
import { ActivityNotFoundError, ForbiddenDeleteActivityError } from "~/errors/exceptions/activity.error";
import { deleteActivitySchema } from "~/lib/validations/activity";

export default defineEventHandler(async (event) => {
	const { id: activityId } = parse(deleteActivitySchema, await readBody(event));

	const activity = await db
		.select()
		.from(activities)
		.where(eq(activities.id, activityId))
	
	if (!activity || activity.length === 0) throw new ActivityNotFoundError();
	else if (activity[0].studentId !== event.context.user.ra) throw new ForbiddenDeleteActivityError() 

	await db
		.delete(activities)
		.where(eq(activities.id, activityId))
	
	return { ok: true }
});
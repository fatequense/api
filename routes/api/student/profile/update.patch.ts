import { eq } from "drizzle-orm";
import { parse } from "valibot";

import { db } from "~/db";
import { students } from "~/db/schema";
import { scrapProfile } from "~/core/scrapers/profile.scraper";
import { updateStudentSchema } from "~/lib/validations/update-student";

export default defineEventHandler(async (event) => {
	const { avatarUrl } = parse(updateStudentSchema, await readBody(event));

	const profile = await scrap({
    route: "/aluno/home.aspx",
    scrapFn: scrapProfile,
    token: event.context.token
  })

	const student = await db
		.select()
		.from(students)
		.where(eq(students.id, profile.ra))
	
	if (student.length === 0) {
		await db
			.insert(students)
			.values({
				id: profile.ra,
				avatarUrl
			})
	} else {
		await db
			.update(students)
			.set({
				avatarUrl
			})
			.where(eq(students.id, profile.ra))
	}

	return { ok: true }
});
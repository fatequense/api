import { boolean, length, maxLength, object, omit, pick, string } from "valibot";

export const activitySchema = object({
	id: string(),
	studentId: string([length(13)]),
	disciplineCode: string([length(6)]),
	title: string([maxLength(64)]),
	description: string([maxLength(255)]),
	untilAt: string(),
	isCompleted: boolean()
});

export const newActivitySchema = omit(activitySchema, ['id']);
export const deleteActivitySchema = pick(activitySchema, ['id']);
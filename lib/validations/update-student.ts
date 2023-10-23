import { object, optional, string, url } from "valibot";

export const updateStudentSchema = object({
	avatarUrl: optional(string([url()]))
});
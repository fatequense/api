import { sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const students = pgTable('students', {
	id: varchar('id', { length: 13 }).primaryKey(),
	avatarUrl: text('avatar')
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;

export const activities = pgTable('activities', {
	id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
	studentId: varchar('studentId').references(() => students.id),
	disciplineCode: varchar('disciplineCode', { length: 6 }),
	title: varchar('title', { length: 64 }),
	description: varchar('description', { length: 255 }),
	untilAt: timestamp('untilAt'),
	isCompleted: boolean('isCompleted'),
});

export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;
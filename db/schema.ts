import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const students = pgTable('students', {
	id: varchar('id', { length: 13 }).primaryKey(),
	avatarUrl: text('avatar')
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
CREATE TABLE IF NOT EXISTS "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" varchar,
	"disciplineCode" varchar(6),
	"title" varchar(64),
	"description" varchar(255),
	"untilAt" timestamp,
	"isCompleted" boolean
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_studentId_students_id_fk" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

import { Output, array, number, object, omit, pick, string, transform } from "valibot";

export const disciplineSchema = object({
  name: string(),
  code: string(),
  class: string(),
  teacherName: transform(
    string(),
    teacherName => teacherName
      .toLowerCase()
      .replace(/(^|\s)\S/g, (char) => char.toUpperCase())
  ),
  courseProgram: string(),
  goal: string(),
  workload: object({
    weekly: number(),
    teorical: number(),
    practical: number(),
    total: number(),
  }),
  totalAbsencesAllowed: number()
})

export type Discipline = Output<typeof disciplineSchema>;

export const disciplineScheduleSchema = object({
  name: string(),
  code: string(),
  class: string(),
  teacherName: transform(
    string(),
    teacherName => teacherName
      .toLowerCase()
      .replace(/(^|\s)\S/g, (char) => char.toUpperCase())
  ),
  workload: number(),
  totalAbsencesAllowed: number()
})

export type DisciplineSchedule = Output<typeof disciplineScheduleSchema>;

export const disciplineMinifySchema = pick(
  disciplineSchema,
  ['name', 'code']
)

export type DisciplineMinify = Output<typeof disciplineMinifySchema>;

export const disciplinesMinifySchema = array(disciplineMinifySchema);
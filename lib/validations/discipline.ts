import { Output, number, object, string, transform } from "valibot";

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
  workload: number(),
  totalAbsencesAllowed: number()
})

export type Discipline = Output<typeof disciplineSchema>;
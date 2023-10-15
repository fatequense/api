import { array, nullable, number, object, string, toTrimmed } from "valibot";

export const partialAbsencesSchema = array(object({
  cod: string([toTrimmed()]),
  disciplineName: string(),
  totalPresences: number(),
  totalAbsences: number(),
  lessons: array(object({
    title: string(),
    date: nullable(string()),
    presences: number(),
    absences: number(),
  })),
}));


import { array, number, object, string } from "valibot";

export const partialGradesSchema = array(object({
  cod: string(),
  disciplineName: string(),
  averageGrade: number(),
  examsDates: array(object({
    title: string(),
    startsAt: string(),
    grade: number()
  })),
}));
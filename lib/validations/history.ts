import { array, boolean, nullable, number, object, string } from "valibot";

export const historySchema = array(object({
  cod: string(),
  disciplineName: string(),
  description: string(),
  finalGrade: number(),
  totalAbsences: number(),
  presenceFrequency: number(),
  renunciationAt: nullable(string()),
  isApproved: boolean(),
}));
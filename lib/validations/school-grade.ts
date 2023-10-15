import { array, enumType, number, object, optional, string } from "valibot";

export const schoolGradeSchema = array(
  object({
    semester: number(),
    disciplines: array(
      object({
        code: string(),
        name: string(),
        workload: number(),
        status: enumType(['dismissed', 'approved', 'attending', 'not-attended']),
        period: optional(number()),
        frequency: optional(number()),
        grade: optional(number()),
      })
    )
  })
);

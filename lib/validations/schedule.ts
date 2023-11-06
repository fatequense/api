import { array, length, object, optional, string } from "valibot";
import { disciplineScheduleSchema } from "./discipline";

export const scheduleSchema = array(
  array(
    object({
      cod: string([length(6)]),
      discipline: optional(disciplineScheduleSchema),
      startsAt: string(),
      endsAt: string()
    })
  )
);
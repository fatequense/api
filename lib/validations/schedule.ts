import { array, length, object, optional, string } from "valibot";

export const scheduleSchema = array(
  array(
    object({
      cod: string([length(6)]),
      discipline: optional(string()),
      startsAt: string(),
      endsAt: string()
    })
  )
);
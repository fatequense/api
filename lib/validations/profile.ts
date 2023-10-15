import { email, number, object, string, toTrimmed, url } from "valibot";

export const profileSchema = object({
  name: string([toTrimmed()]),
  ra: string(),
  personalEmail: string([email()]),
  institutionalEmail: string([email()]),
  birthday: string(),
  averageGrade: number(),
  progression: number(),
  semestersAttended: number(),
  currentSemester: number(),
  photoUrl: string([url()]),
  college: object({
    name: string(),
    courseName: string(),
    coursePeriod: string(),
    state: string(),
  }),
});
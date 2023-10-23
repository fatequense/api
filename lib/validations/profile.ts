import { email, number, object, optional, string, toTrimmed, transform, url } from "valibot";

export const profileSchema = object({
  name: transform(
    string([toTrimmed()]),
    name => name
      .toLowerCase()
      .replace(/(^|\s)\S/g, (char) => char.toUpperCase())
  ),
  ra: string(),
  personalEmail: string([email()]),
  institutionalEmail: string([email()]),
  birthday: string(),
  averageGrade: number(),
  progression: number(),
  semestersAttended: number(),
  currentSemester: number(),
  photoUrl: string([url()]),
  avatarUrl: optional(string([url()])),
  college: object({
    name: string(),
    courseName: string(),
    coursePeriod: string(),
    state: string(),
  }),
});
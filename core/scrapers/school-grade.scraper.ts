import type { CheerioAPI, Element } from "cheerio";
import { parse } from "valibot";
import { schoolGradeSchema } from "~/lib/validations/school-grade";
import { ParsedHtml } from "../scrap";

const statusCode = {
  '#fdb2b2': 'dismissed',
  '#75fa9f': 'approved',
  '#b2d4fd': 'attending',
  '#ffffff': 'not-attended',
} as const;

function extractDiscipline($: CheerioAPI, disciplineDiv: Element) {
  const $discipline = $(disciplineDiv);
  const data = $discipline
    .find('tr td')
    .map((_, td) => {
      const $td = $(td);
      const str = $td.text().trim();
      if (str.includes('NF:')) {
        return $td
          .find('b')
          .map((_, b) => $(b).text().trim())
          .get();
      }

      return str;
    })
    .get();

  const bgColor = $discipline
    .css('background-color')
    ?.toLowerCase() as keyof typeof statusCode;
  const status = statusCode[bgColor];

  let discipline: any = {
    workload: Number(data[1].replace('AS:', '')),
    code: data[0],
    name: data[2],
    status,
  };

  if (data.length > 3) {
    discipline = {
      ...discipline,
      period: Number(data[5]),
      frequency: Number(data[4]),
      grade: Number(data[3]),
    };
  }

  return discipline;
}

export function scrapSchoolGrade({ $ }: ParsedHtml) {
  const semesters = $('#TABLE1 table [valign=TOP]')
    .map((i, semesterColumn) => {
      const disciplines = $(semesterColumn)
        .find('> div')
        .map((_, disciplineDiv) => extractDiscipline($, disciplineDiv))
        .get();

      return {
        semester: i + 1,
        disciplines,
      };
    })
    .get();
  
  return parse(schoolGradeSchema, semesters);
}
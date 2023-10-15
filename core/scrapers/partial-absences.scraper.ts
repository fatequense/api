import { parse } from "valibot";
import { partialAbsencesSchema } from "~/lib/validations/partial-absences";
import { ParsedHtml } from "../scrap";

export function scrapPartialAbsences({ $, ...gxstate }: ParsedHtml) {
  return parse(
    partialAbsencesSchema,
    gxstate.get('vFALTAS').map((discipline) => ({
      cod: discipline['ACD_DisciplinaSigla'],
      disciplineName: discipline['ACD_DisciplinaNome'],
      totalPresences: discipline['TotalPresencas'],
      totalAbsences: discipline['TotalAusencias'],
      lessons: discipline['Aulas'].map((lesson) => ({
        title: lesson['ACD_PlanoEnsinoConteudoTituloAula'],
        date: !lesson['ACD_PlanoEnsinoConteudoDataAula'].startsWith('0000')
          ? lesson['ACD_PlanoEnsinoConteudoDataAula']
          : null,
        presences: lesson['Presencas'],
        absences: lesson['Ausencias'],
      })),
    })),
  );
}
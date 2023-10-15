import { parse } from "valibot";
import { partialGradesSchema } from "~/lib/validations/partial-grades";
import { ParsedHtml } from "../scrap";

export function scrapPartialGrades({ $, ...gxstate }: ParsedHtml) {
  return parse(
    partialGradesSchema,
    gxstate
      .get('vACD_ALUNONOTASPARCIAISRESUMO_SDT')
      .map((discipline) => ({
        cod: discipline['ACD_DisciplinaSigla'],
        disciplineName: discipline['ACD_DisciplinaNome'],
        averageGrade: discipline['ACD_AlunoHistoricoItemMediaFinal'],
        examsDates: discipline['Datas'].map((examDate) => ({
          title: examDate['ACD_PlanoEnsinoAvaliacaoTitulo'],
          startsAt: examDate['ACD_PlanoEnsinoAvaliacaoDataPrevista'],
          grade:
            examDate['Avaliacoes'].length > 0
              ? examDate['Avaliacoes'][0]['ACD_PlanoEnsinoAvaliacaoParcialNota']
              : 0,
        })),
      })),
  );
}
import { parse } from "valibot";
import { historySchema } from "~/lib/validations/history";
import type { ParsedHtml } from "../scrap";

export function scrapHistory({ $, ...gxstate }: ParsedHtml) {
  return parse(
    historySchema,
    gxstate
      .get('vALU_ALUNONOTAS_SDT')
      .map((disciplineHistory) => ({
        cod: disciplineHistory['ACD_DisciplinaSigla'],
        disciplineName: disciplineHistory['ACD_DisciplinaNome'],
        description: disciplineHistory['GER_TipoObservacaoHistoricoDescricao'],
        finalGrade: disciplineHistory['ACD_AlunoHistoricoItemMediaFinal'],
        totalAbsences: disciplineHistory['ACD_AlunoHistoricoItemQtdFaltas'],
        presenceFrequency:
          disciplineHistory['ACD_AlunoHistoricoItemFrequencia'] / 100,
        renunciationAt: !disciplineHistory[
          'ACD_AlunoHistoricoItemDesistenciaData'
        ].startsWith('0000')
          ? disciplineHistory['ACD_AlunoHistoricoItemDesistenciaData']
          : null,
        isApproved: disciplineHistory['ACD_AlunoHistoricoItemAprovada'] === 1,
      }))
  );
}
import { parse } from "valibot";
import type { ParsedHtml } from "../scrap";
import { disciplineSchema } from "~/lib/validations/discipline";
import { MINIMUM_ATTENDANCE_PERCENTAGE } from "../constants";

export function scrapDiscipline({ $ }: ParsedHtml) {
	const totalWorkload = Number($('#span_W0008W0013vACD_DISCIPLINAAULASTOTAISPERIODO').text());

	return parse(disciplineSchema, {
		name: $('#span_W0005vACD_DISCIPLINANOME').text(),
		code: $('#span_W0005vSHOW_ACD_DISCIPLINASIGLA').text(),
		class: $('#span_W0005vACD_TURMALETRA').text(),
		teacherName: $('#span_W0005vPRO_PESSOALNOME').text(),
		courseProgram: $('#span_W0008W0013vACD_DISCIPLINAEMENTA').text(),
		goal: $('#span_W0008W0013vACD_DISCIPLINAOBJETIVO').text(),
		workload: {
			weekly: Number($('#span_W0008W0013vACD_DISCIPLINAAULASSEMANAIS').text()),
			teorical: Number($('#span_W0008W0013vACD_DISCIPLINAAULASTEORICAS').text()),
			practical: Number($('#span_W0008W0013vACD_DISCIPLINAAULASPRATICAS').text()),
			total: totalWorkload
		},
		totalAbsencesAllowed: totalWorkload - totalWorkload * MINIMUM_ATTENDANCE_PERCENTAGE
	});
}



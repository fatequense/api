import dayjs from "dayjs";

import { parse } from "valibot";
import { Discipline } from "~/lib/validations/discipline";
import { scheduleSchema } from "~/lib/validations/schedule";
import { MINIMUM_ATTENDANCE_PERCENTAGE } from "../constants";
import { ParsedHtml } from "../scrap";

export function parseDiscipline(discipline: unknown) {
  const title = discipline['ACD_DisciplinaNome'];
  const [, name, hours] =
    title.match(/^(.+)(?:<br\\?&?gt;|<br\\?>)(\d+)hs/) ?? [];

  const totalWorkload = 20 * Number(hours);

  const totalAbsencesAllowed =
    totalWorkload - totalWorkload * MINIMUM_ATTENDANCE_PERCENTAGE;
  
  return {
    name,
    code: discipline['ACD_DisciplinaSigla'],
    teacherName: discipline['Pro_PessoalNome'],
    class: discipline['ACD_TurmaLetra'],
    workload: Number(hours),
    totalAbsencesAllowed,
  };
}

export function scrapSchedule({ $, ...gxstate }: ParsedHtml) {
  const allDisciplines = gxstate
    .get('vALU_ALUNOHISTORICOITEM_SDT')
    .map(parseDiscipline)
    .reduce(
      (prev, curr) => prev.set(curr.code, curr),
      new Map<string, Discipline>(),
    );

  const dataGridTags = [
    '[name="Grid2ContainerDataV"]',
    '[name="Grid3ContainerDataV"]',
    '[name="Grid4ContainerDataV"]',
    '[name="Grid5ContainerDataV"]',
    '[name="Grid6ContainerDataV"]',
    '[name="Grid7ContainerDataV"]',
  ];

  const today = dayjs();
  const todayStr = today.format('YYYY-MM-DD');
  const todayWeek = today.day();

  const schedule = dataGridTags.map((tag, idx) => {
    const dayLessons = JSON.parse($(tag).attr('value') || '{}') as string[][];
    const currWeekday = idx + 1;

    return dayLessons
      .map((lesson) => {
        const [_, horaries, cod] = lesson;
        const [startsAt, endsAt] = horaries.split('-');

        const incDays = (currWeekday - todayWeek + 7) % 7;

        const startsAtDate = dayjs(
          `${todayStr} ${startsAt}`,
          'DD/MM/YYYY HH:mm',
        ).add(incDays, 'day');
        const endsAtDate = dayjs(
          `${todayStr} ${endsAt}`,
          'DD/MM/YYYY HH:mm',
        ).add(incDays, 'day');

        const discipline = allDisciplines.get(cod);

        return {
          cod,
          startsAt: startsAtDate.toISOString(),
          endsAt: endsAtDate.toISOString(),
          discipline,
        };
      })
      .sort((a, b) => (dayjs(a.startsAt) < dayjs(b.startsAt) ? -1 : 1));
  });


  return parse(scheduleSchema, schedule);
}
import type { CacheOptions } from "nitropack";
import { STATUS } from "~/core/constants";
import { Route, api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapDiscipline } from "~/core/scrapers/discipline.scraper";
import { scrapDisciplines } from "~/core/scrapers/disciplines.scraper";
import { scrapHistory } from "~/core/scrapers/history.scraper";
import { scrapPartialAbsences } from "~/core/scrapers/partial-absences.scraper";
import { scrapPartialGrades } from "~/core/scrapers/partial-grades.scraper";
import { scrapProfile } from "~/core/scrapers/profile.scraper";
import { scrapSchedule } from "~/core/scrapers/schedule.scraper";
import { scrapSchoolGrade } from "~/core/scrapers/school-grade.scraper";

type SigaFetchReturn = (
	{ success: false } |
	{ success: true, data: unknown }
)

type User = {
	ra: string,
	session: string
}

const commonCacheOptions: CacheOptions = {
  group: "ft",
  swr: false,
  maxAge: 60 * 60 * 6,
  staleMaxAge: 60 * 60 * 12,
}

const cacheOptions = (name: string) => ({ ...commonCacheOptions, name })

export const sigaFetch = defineCachedFunction(
	async (route: Route, token: string): Promise<SigaFetchReturn> => {
		const { res } = await api.get(route, token);
		
		if (res.status === STATUS.REDIRECT) return { success: false };

		return {
			success: true,
			data: res.data
		}
	},
	{
		...cacheOptions("api"),
		integrity: "TQRx3mRhJK0=",
		validate: (entry) => {
			return entry && entry.value && entry.value.success
		},
		getKey: (route, token) => `${route}-${token}`
	} as const
)

export const sigaProfile = defineCachedFunction(
	async (user: User) => {
		const res = await sigaFetch("/aluno/home.aspx", user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapProfile(html)
		};
	},
	{
		...cacheOptions("profile"),
		getKey: (user) => `profile-${user.ra}`
	}
)

export const sigaPartialAbsences = defineCachedFunction(
	async (user: User) => {
		const res = await sigaFetch("/aluno/faltasparciais.aspx", user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapPartialAbsences(html)
		};
	},
	{
		...cacheOptions("partial-absences"),
		getKey: (user) => `partialabsences-${user.ra}`
	}
)

export const sigaPartialGrades = defineCachedFunction(
	async (user: User) => {
		const res = await sigaFetch("/aluno/notasparciais.aspx", user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapPartialGrades(html)
		};
	},
	{
		...cacheOptions("partial-grades"),
		getKey: (user) => `partialgrades-${user.ra}`
	}
)

export const sigaHistory = defineCachedFunction(
	async (user: User) => {
		const res = await sigaFetch("/aluno/historicocompleto.aspx", user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapHistory(html)
		};
	},
	{
		...cacheOptions("history"),
		getKey: (user) => `history-${user.ra}`
	}
)

export const sigaSchedule = defineCachedFunction(
	async (user: User) => {
		const res = await sigaFetch("/aluno/horario.aspx", user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapSchedule(html)
		};
	},
	{
		...cacheOptions("schedule"),
		getKey: (user) => `schedule-${user.ra}`
	}
)

export const sigaSchoolGrade = defineCachedFunction(
	async (user: User) => {
		const res = await sigaFetch("/aluno/historicograde.aspx", user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapSchoolGrade(html)
		};
	},
	{
		...cacheOptions("school-grade"),
		getKey: (user) => `schoolgrade-${user.ra}`
	}
)

export const sigaDisciplines = defineCachedFunction(
	async (user: User) => {
		const res = await sigaFetch("/aluno/notasparciais.aspx", user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapDisciplines(html)
		};
	},
	{
		...cacheOptions("disciplines"),
		getKey: (user) => `disciplines-${user.ra}`
	}
)

export const sigaDiscipline = defineCachedFunction(
	async (code: string, user: User) => {
		const res = await sigaFetch(`/aluno/planoensino.aspx?${code}` as Route, user.session)

		if (!res.success) return res;

		const html = await parseHtml(Buffer.from(res.data as any).toString());
		return {
			success: true,
			data: scrapDiscipline(html)
		};
	},
	{
		...cacheOptions("discipline"),
		getKey: (disciplineCode, user) => `discipline-${disciplineCode}-${user.ra}`
	}
)
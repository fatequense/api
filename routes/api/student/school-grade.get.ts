import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapSchoolGrade } from "~/core/scrapers/school-grade.scraper";
import { AccessDeniedError } from "~/errors/exceptions/siga.error";

export default defineEventHandler(async (event) => {
  const { res } = await api.get("/aluno/historicograde.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new AccessDeniedError();

  const html = await parseHtml(res.data);
  
  return scrapSchoolGrade(html);
});
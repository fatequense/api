import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapSchoolGrade } from "~/core/scrapers/school-grade.scraper";

export default cachedEventHandler(async (event) => {
  const { res } = await api.get("/aluno/historicograde.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new Error("Failed to get school grade.");

  const html = await parseHtml(res.data);
  const schoolGrade = scrapSchoolGrade(html);

  return { schoolGrade };
}, {
  maxAge: 60 * 60,
  getKey(event) {
    return `${event.path}-${event.context.token}`;
  }
});
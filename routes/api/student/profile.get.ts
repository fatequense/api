import { STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapProfile } from "~/core/scrapers/profile.scraper";

export default defineEventHandler(async (event) => {
  const { res } = await api.get("/aluno/home.aspx", event.context.token);
  
  if (res.status === STATUS.REDIRECT) throw new Error("Failed to get profile.");

  const html = await parseHtml(res.data);
  const profile = scrapProfile(html);

  return { profile };
});
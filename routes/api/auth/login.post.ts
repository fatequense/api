import { length, object, parse, string } from "valibot";
import { COOKIES, GX_STATE, INPUT_IDS, STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { scrapProfile } from "~/core/scrapers/profile.scraper";
import { AuthError } from "~/errors/exceptions/siga.error";

const loginSchema = object({
  username: string("Username must be a string", [
    length(11, "Username must be 11 characters long")
  ]),
  password: string("Password must be a string"),
});

export default defineEventHandler(async event => {
  const { username, password } = parse(loginSchema, await readBody(event));

  const { res } = await api.post("/aluno/login.aspx", {
    data: {
      GXState: GX_STATE.LOGIN,
      [INPUT_IDS.USERNAME]: username,
      [INPUT_IDS.PASSWORD]: password,
      [INPUT_IDS.CONFIRM]: "Confirmar"
    }
  });

  if (res.status !== STATUS.REDIRECT) throw new AuthError();

  const cookies = parseCookie(res.headers['set-cookie'] as string);
  const session = encrypt(cookies.get(COOKIES.AUTH) as string).toString('base64')

  const profileRes = await sigaFetch("/aluno/home.aspx", session)

  if (!profileRes.success) throw new AuthError()

  const html = await parseHtml(Buffer.from(profileRes.data as any).toString());
  const profile = scrapProfile(html)

  const token = jwtSign({
    ra: profile.ra,
    session,
  });

  return { token };
});
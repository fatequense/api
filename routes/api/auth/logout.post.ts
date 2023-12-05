import { COOKIES, STATUS } from "~/core/constants";
import { api } from "~/core/network";
import { parseHtml } from "~/core/scrap";
import { AccessDeniedError } from "~/errors/exceptions/siga.error";

async function getLogoutGXStateEvent(token: string) {
	const { res } = await api.get("/aluno/home.aspx", token);
  
  if (res.status === STATUS.REDIRECT) throw new AccessDeniedError();

  const gxstate = await parseHtml(res.data);

	return JSON.stringify({
    ...gxstate.parsed,
    _EventName: `${gxstate.prefix}E'SAIR'.`,
    sCallerURL: 'http://siga.cps.sp.gov.br/login.aspx',
  });
}

export default defineEventHandler(async event => {
	const logoutEvent = await getLogoutGXStateEvent(event.context.user.session)

	const { res } = await api.post("/aluno/home.aspx", {
		headers: {
			cookie: `${COOKIES.AUTH}=${decrypt(event.context.user.session)}`
		},
		data: {
			GXState: logoutEvent
		}
	});

	if (res.statusCode !== STATUS.REDIRECT) throw new AccessDeniedError();

	return { ok: true };
});
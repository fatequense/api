import { object, parse, string } from "valibot";
import { COOKIES, GX_STATE, INPUT_IDS, STATUS } from "~/core/constants";
import { api } from "~/core/network";

const loginSchema = object({
  username: string(),
  password: string()
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

  if (res.status !== STATUS.REDIRECT) throw new Error("Failed to login");

  const cookies = parseCookie(res.headers['set-cookie'] as string);
  const token = jwtSign({
    session: encrypt(cookies.get(COOKIES.AUTH) as string).toString('base64')
  });

  return { token };
});
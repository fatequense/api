import { MissingTokenError, UnauthorizedError } from "~/errors/exceptions/siga.error";

export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api/student')) return;

  const authorizationHeader = event.headers.get("Authorization");

  if (!authorizationHeader) throw new MissingTokenError();

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwtVerify(token);

    event.context.token = payload.session;
  } catch {
    throw new UnauthorizedError();
  }
});
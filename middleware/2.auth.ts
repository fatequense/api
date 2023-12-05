import { MissingTokenError, UnauthorizedError } from "~/errors/exceptions/siga.error";

const excludeRoutes = ['/api/auth/login'];

export default defineEventHandler((event) => {
  if (excludeRoutes.some(route => event.path.startsWith(route))) return;

  const authorizationHeader = event.headers.get("Authorization");

  if (!authorizationHeader) throw new MissingTokenError();

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwtVerify(token);

    event.context.user = payload;
  } catch {
    throw new UnauthorizedError();
  }
});
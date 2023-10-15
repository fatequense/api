export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api/student')) return;

  const authorizationHeader = event.headers.get("Authorization");

  if (!authorizationHeader) throw new Error("Unauthorized. Missing authorization token.")

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwtVerify(token);

    event.context.token = payload.session;
  } catch {
    throw new Error("Unauthorized. Invalid authorization token.");
  }
});
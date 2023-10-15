export function parseCookie(cookies: string) {
  const allCookies = new Map<string, string | boolean>();

  cookies.split(';').forEach((cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');

    allCookies.set(cookieName.trim(), cookieValue ? cookieValue.trim() : true);
  });

  return allCookies;
}
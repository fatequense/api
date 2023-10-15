import * as cheerio from 'cheerio';

function parseToJSON(gxstate: string) {
  return JSON.parse(gxstate.replace(/\\>/g, '&gt;'));
}

function getPrefixFromGXState(gxstate: string) {
  const matchResult = gxstate.match(/MPW\d{4}/);
  if (matchResult === null) return null;

  return matchResult[0];
}

export async function parseHtml(html: string) {
  const $ = cheerio.load(html);

  const gxstate = $('[name="GXState"]').val() as string;
  const gxstateParsed = parseToJSON(gxstate);
  const gxstatePrefix = getPrefixFromGXState(gxstate);

  return {
    $,
    default: gxstate,
    parsed: gxstateParsed,
    prefix: gxstatePrefix,

    get(key: string, withPrefix = false) {
      if (withPrefix && gxstatePrefix)
        return gxstateParsed[`${gxstatePrefix}${key}`];

      return gxstateParsed[key];
    }
  }
}

export type ParsedHtml = Awaited<ReturnType<typeof parseHtml>>;
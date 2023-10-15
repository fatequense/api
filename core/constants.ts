export const BASE_URL = 'https://siga.cps.sp.gov.br';

export const COOKIES = {
  AUTH: 'ASP.NET_SessionId'
};

export const INPUT_IDS = {
  USERNAME: 'vSIS_USUARIOID',
  PASSWORD: 'vSIS_USUARIOSENHA',
  CONFIRM: 'BTCONFIRMA',
}

export const GX_STATE = {
  LOGIN: `{"_EventName":"E'EVT_CONFIRMAR'.","_EventGridId":"","_EventRowId":"","MPW0005_CMPPGM":"login_top.aspx","MPW0005GX_FocusControl":"","vSAIDA":"","vREC_SIS_USUARIOID":"","GX_FocusControl":"vSIS_USUARIOID","GX_AJAX_KEY":"227C6BB63E2317B6E4280797473CCB58","AJAX_SECURITY_TOKEN":"71F312E29FC45715930741D56ABFF0A9A20CB119F6977C3592DE12B14EC14DA7","GX_CMP_OBJS":{"MPW0005":"login_top"},"sCallerURL":"","GX_RES_PROVIDER":"GXResourceProvider.aspx","GX_THEME":"GeneXusX","_MODE":"","Mode":"","IsModified":"1"}`
};

export const STATUS = {
  REDIRECT: 303
};

export const ROUTES = {
  login: '/aluno/login.aspx',
  home: '/aluno/home.aspx',
  partialGrade: '/aluno/notasparciais.aspx',
  schedule: '/aluno/horario.aspx',
  partialAbsences: '/aluno/faltasparciais.aspx',
  examsCalendar: '/aluno/calendarioprovas.aspx',
  schoolGrade: '/aluno/historicograde.aspx',
  history: '/aluno/historicocompleto.aspx',
  disciplines: '/aluno/planoensino.aspx',
} as const;

export const MINIMUM_ATTENDANCE_PERCENTAGE = 0.75;
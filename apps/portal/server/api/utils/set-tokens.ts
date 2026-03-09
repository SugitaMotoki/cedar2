import type { H3Event, EventHandlerRequest } from "h3";

/**
 * アクセストークンとリフレッシュトークンをCookieにセットする関数
 * @param event HTTPRequestイベント
 * @param accessToken
 * @param refreshToken
 */
export default function (
  event: H3Event<EventHandlerRequest>,
  accessToken: string,
  refreshToken: string,
) {
  const { COOKIE } = useConstant();

  setCookie(event, COOKIE.ACCESS_TOKEN, accessToken, {
    maxAge: COOKIE.ACCESS_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: "strict",
  });

  setCookie(event, COOKIE.REFRESH_TOKEN, refreshToken, {
    maxAge: COOKIE.REFRESH_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: "strict",
  });
}

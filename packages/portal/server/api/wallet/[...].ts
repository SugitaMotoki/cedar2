import type { LoginResponse } from "@cedar2/interface";
import { FetchError } from "ofetch";
import setTokens from "../utils/set-tokens";
import type { PortalLogoutResult } from "~~/shared/types/api";

/**
 * /api/wallet
 * 会計APIへのリクエストをプロキシするAPI
 */
export default defineEventHandler(async (event) => {
  // 定数
  const { API, COOKIE } = useConstant();

  // URLの書き換え
  const proxyPath = event.path.replace(/^\/api\/wallet/, "");
  const targetUrl = `${API.WALLET.BASE_URL}${proxyPath}`;

  /**
   * 認証付きでリクエストを送るヘルパー関数
   * @param token トークン（undefined許容）
   * @returns APIから取得したデータ
   */
  const fetchWithAuth = async (token: string | undefined): Promise<unknown> => {
    return $fetch(targetUrl, {
      method: event.method,
      headers: {
        ...getProxyRequestHeaders(event),
        Authorization: token ? `Bearer ${token}` : "",
      },
      body:
        event.method !== "GET"
          ? await readBody(event).catch(() => undefined)
          : undefined,
      params: getQuery(event),
    });
  };

  /**
   * ログアウト時の処理を実施するヘルパー関数
   * @returns
   */
  const handleLogout = (): PortalLogoutResult => {
    deleteCookie(event, COOKIE.ACCESS_TOKEN);
    deleteCookie(event, COOKIE.REFRESH_TOKEN);
    return {
      isSuccessed: true,
    };
  };

  try {
    const accessToken = getCookie(event, COOKIE.ACCESS_TOKEN);

    // 1回目のリクエスト
    const result = await fetchWithAuth(accessToken);
    if (proxyPath === "/auth/logout") {
      return handleLogout();
    } else {
      return result;
    }
  } catch (error: unknown) {
    if (!(error instanceof FetchError)) {
      // フェッチエラー以外ならそのままスロー
      throw error;
    } else if (error.status !== 401) {
      // 認証エラー以外ならcreateError
      throw createError({
        status: error.status,
        cause: error.cause,
        statusText: error.message,
      });
    }

    // リトライ
    try {
      // リフレッシュトークンを取得
      const refreshToken = getCookie(event, COOKIE.REFRESH_TOKEN);

      // リフレッシュAPIをたたく
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await $fetch<LoginResponse>(API.WALLET.AUTH.REFRESH, {
          baseURL: API.WALLET.BASE_URL,
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

      // トークンをCookieにセット
      setTokens(event, newAccessToken, newRefreshToken);

      // 2回目のリクエスト
      const result = await fetchWithAuth(newAccessToken);
      if (proxyPath === "/auth/logout") {
        return handleLogout();
      } else {
        return result;
      }
    } catch (retryError) {
      if (retryError instanceof FetchError) {
        deleteCookie(event, COOKIE.ACCESS_TOKEN);
        deleteCookie(event, COOKIE.REFRESH_TOKEN);
        throw createError({
          status: 401,
          statusText: retryError.message,
        });
      }
      throw retryError;
    }
  }
});

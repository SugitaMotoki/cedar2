import type { LoginResponse } from "@cedar2/interface";
import { FetchError } from "ofetch";
import setTokens from "../utils/set-tokens";

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

  try {
    // 1回目のリクエスト
    const accessToken = getCookie(event, COOKIE.ACCESS_TOKEN);
    return await fetchWithAuth(accessToken);
  } catch (error: unknown) {
    // 認証エラー以外なら例外を投げて終了
    if (!(error instanceof FetchError) || error.status !== 401) {
      throw error;
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
      return await fetchWithAuth(newAccessToken);
    } catch (retryError) {
      deleteCookie(event, COOKIE.ACCESS_TOKEN);
      deleteCookie(event, COOKIE.REFRESH_TOKEN);
      throw retryError;
    }
  }
});

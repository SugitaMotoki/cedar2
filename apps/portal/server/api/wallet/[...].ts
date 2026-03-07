/**
 * /api/wallet
 * 会計APIへのリクエストをプロキシするAPI
 */
export default defineEventHandler(async (event) => {
  const { API, COOKIE } = useConstant();

  // URLの書き換え
  const proxyPath = event.path.replace(/^\/api\/wallet/, "");
  const targetUrl = `${API.WALLET.BASE_URL}${proxyPath}`;

  // アクセストークンの取得
  const accessToken = getCookie(event, COOKIE.ACCESS_TOKEN);

  // アクセストークンをヘッダにつけてリクエスト
  return proxyRequest(event, targetUrl, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
});

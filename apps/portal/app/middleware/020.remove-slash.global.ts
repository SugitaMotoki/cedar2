/**
 * パスに関するミドルウェア
 */
export default defineNuxtRouteMiddleware(async (to) => {
  // 遷移先が/ならなにもしない
  if (to.path === "/") {
    return;
  }

  // スラッシュで終わっていたら取り除く
  if (to.path.endsWith("/")) {
    const nextPath = to.path.replace(/\/+$/, '') || '/'
    return navigateTo(
      { path: nextPath, query: to.query },
      { redirectCode: 301 },
    )
  }
});

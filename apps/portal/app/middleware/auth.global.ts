/**
 * ページ遷移時に認証を行うミドルウェア
 */
export default defineNuxtRouteMiddleware((to) => {
  // 遷移先が/loginならなにもしない
  if (to.path === "/login") {
    return;
  }

  // ログインしていなければ/loginに遷移する
});

/**
 * ページ遷移時に認証を行うミドルウェア
 */
export default defineNuxtRouteMiddleware(async (to) => {
  // 遷移先が/loginならなにもしない
  if (to.path === "/login") {
    return;
  }

  // ユーザを取得する
  try {
    await useUserStore().fetch();
  } catch {
    return navigateTo("/login");
  }
});

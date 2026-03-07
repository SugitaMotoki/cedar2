/**
 * 会計APIにリクエストするためのプラグイン
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { API } = useConstant();

  /**
   * 会計APIにリクエストする$fetchメソッド
   */
  const walletFetch = $fetch.create({
    baseURL: `${API.PORTAL.BASE_URL}${API.PORTAL.WALLET}`,
    onResponseError: async ({ response }) => {
      if (response.status === 401) {
        useUserStore().clear();
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });

  return {
    provide: {
      walletFetch,
    },
  };
});

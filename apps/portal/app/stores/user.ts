import type { GetUserSummaryDto } from "@cedar2/interface";

const DEFAULT_DTO: GetUserSummaryDto = {
  id: "",
  createdAt: "",
  updatedAt: "",
} as const;

/**
 * ログイン中のユーザを保存するストア
 */
export const useUserStore = defineStore("userStore", {
  state: (): { dto: GetUserSummaryDto } => ({
    dto: DEFAULT_DTO,
  }),
  actions: {
    /**
     * ログイン中のユーザを取得するメソッド
     */
    async fetch() {
      const { API } = useConstant();
      const { $walletFetch } = useNuxtApp();
      const { _data } = await $walletFetch.raw<GetUserSummaryDto>(
        API.WALLET.AUTH.PROFILE,
      );
      this.dto = _data ? _data : DEFAULT_DTO;
    },

    /**
     * ユーザ情報を消去するメソッド
     */
    clear() {
      this.dto = DEFAULT_DTO;
    },
  },
});

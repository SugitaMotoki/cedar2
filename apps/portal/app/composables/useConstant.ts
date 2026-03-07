/**
 * 定数を利用するためのコンポーザブル
 */
export const useConstant = () => {
  return {
    /**
     * API
     */
    API: {
      /**
       * ポータル
       */
      PORTAL: {
        /**
         * ベースURL
         */
        BASE_URL: "/",

        /**
         * ログイン
         */
        LOGIN: "api/login",

        /**
         * Wallet
         */
        WALLET: "api/wallet",
      },

      /**
       * 会計API
       */
      WALLET: {
        /**
         * ベースURL
         */
        BASE_URL: getWalletBaseUrl(),

        /**
         * 認証
         */
        AUTH: {
          /**
           * ログイン
           */
          LOGIN: "auth/login",

          /**
           * プロフィール
           */
          PROFILE: "auth/profile",
        },

        /**
         * 支払い
         */
        PAYMENTS: "payments",
      },
    },

    /**
     * Cookie
     */
    COOKIE: {
      /**
       * 有効期限
       */
      MAX_AGE: 60,

      /**
       * セッション
       */
      ACCESS_TOKEN: "accessToken",
    },
  } as const;
};

/**
 * WalletのベースURLを取得する関数
 */
const getWalletBaseUrl = () => {
  const config = useRuntimeConfig();
  const { SCHEME, FQDN, PORT } = config.public.WALLET;
  return `${SCHEME}://${FQDN}:${PORT}`;
};

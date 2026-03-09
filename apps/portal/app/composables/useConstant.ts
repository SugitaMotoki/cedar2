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
       * アクセストークン
       */
      ACCESS_TOKEN: "accessToken",

      /**
       * リフレッシュトークン
       */
      REFRESH_TOKEN: "refreshToken",

      /**
       * アクセストークンの有効期限
       */
      ACCESS_TOKEN_MAX_AGE: 60 * 1, // 1分
      // ACCESS_TOKEN_MAX_AGE: 60 * 15, // 15分

      /**
       * アクセストークンの有効期限
       */
      REFRESH_TOKEN_MAX_AGE: 60 * 3, // 3分
      // REFRESH_TOKEN_MAX_AGE: 60 * 60 * 24 * 365 * 3, // 3年
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

/**
 * 環境変数名
 */
export const ENV = {
  /**
   * 共通
   */
  COMMON: {
    /**
     * ホスト名
     */
    HOSTNAME: "HOSTNAME",

    /**
     * タイムゾーン
     */
    TZ: "TZ",
  },

  /**
   * ポータル
   */
  PORTAL: {
    /**
     * ポート
     */
    PORT: "PORTAL_PORT",
  },

  /**
   * 会計API
   */
  WALLET: {
    /**
     * ポート
     */
    PORT: "WALLET_PORT",

    /**
     * JWTのシークレットキー
     */
    JWT_SECRET: "WALLET_JWT_SECRET",
  },

  /**
   * DB
   */
  DB: {
    /**
     * DB名
     */
    NAME: "DB_NAME",

    /**
     * ユーザ名
     */
    USER: "DB_USER",

    /**
     * パスワード
     */
    PASSWORD: "DB_PASSWORD",

    /**
     * ポート
     */
    PORT: "DB_PORT",
  },
} as const;

/**
 * 認証関連の定数
 */
export const AUTH = {
  /**
   * 公開であることを表すキー
   */
  IS_PUBLIC_KEY: "isPublic",

  /**
   * アクセストークン
   */
  ACCESS_TOKEN: "access_token",
} as const;

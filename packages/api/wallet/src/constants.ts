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
     * アクセストークン発行用のJWTシークレットキー
     */
    JWT_SECRET: "WALLET_JWT_SECRET",

    /**
     * リフレッシュトークン発行用のJWTシークレットキー
     */
    JWT_REFRESH_SECRET: "WALLET_JWT_REFRESH_SECRET",
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
  IGNORE_JWT_AUTH_GUARD: "ignoreJwtAuthGuard",

  /**
   * アクセストークンの有効期限
   */
  ACCESS_TOKEN_EXPIRES_IN: "1m",
  // ACCESS_TOKEN_EXPIRES_IN: "15m",

  /**
   * リフレッシュトークンの有効期限
   */
  REFRESH_TOKEN_EXPIRES_IN: "3m",
  // REFRESH_TOKEN_EXPIRES_IN: "3y",
} as const;

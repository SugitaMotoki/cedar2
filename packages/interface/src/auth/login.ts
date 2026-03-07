/**
 * ログイン時のリクエスト
 */
export type LoginRequest = {
  /**
   * ユーザID
   */
  userId: string;

  /**
   * パスワード
   */
  password: string;
};

/**
 * ログインのレスポンス
 */
export type LoginResponse = {
  /**
   * アクセストークン
   */
  accessToken: string;
};

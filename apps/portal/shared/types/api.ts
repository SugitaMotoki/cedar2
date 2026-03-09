/**
 * /api/loginのレスポンス
 */
export type PortalLoginResult =
  | {
      /**
       * 成功したかどうか
       */
      isSuccessed: true;
    }
  | {
      /**
       * 成功したかどうか
       */
      isSuccessed: false;

      /**
       * エラー
       */
      error: unknown;
    };

/**
 * /api/logoutのレスポンス
 */
export type PortalLogoutResult =
  | {
      /**
       * 成功したかどうか
       */
      isSuccessed: true;
    }
  | {
      /**
       * 成功したかどうか
       */
      isSuccessed: false;

      /**
       * エラー
       */
      error: unknown;
    };

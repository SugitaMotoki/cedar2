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

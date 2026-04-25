/**
 * ユーザ更新用DTO
 */
export interface UpdateUserProfileDto {
  /**
   * 表示名
   */
  displayName?: string;

  /**
   * 生年月日
   */
  birthday?: string;

  /**
   * 自己紹介
   */
  bio?: string;

  /**
   * アイコン画像のURL
   */
  avatarUrl?: string;

  /**
   * タイムゾーン
   */
  timezone?: string;

  /**
   * 言語設定
   */
  language?: string;
}

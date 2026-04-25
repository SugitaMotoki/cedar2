/**
 * ユーザプロフィール取得用DTO
 */
export interface GetUserProfileDto {
  /**
   * ID
   */
  id: number;

  /**
   * 表示名
   */
  displayName: string;

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
  timezone: string;

  /**
   * 言語設定
   */
  language: string;

  /**
   * 作成日
   */
  createdAt: string;

  /**
   * 更新日
   */
  updatedAt: string;
}

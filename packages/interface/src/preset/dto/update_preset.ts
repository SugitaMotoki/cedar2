/**
 * プリセット更新用DTO
 */
export interface UpdatePresetDto {
  /**
   * グループID
   */
  groupId: number;

  /**
   * タイトル
   */
  title: string;

  /**
   * メモ
   */
  note: string;

  /**
   * カテゴリID
   */
  categoryId: number;
}

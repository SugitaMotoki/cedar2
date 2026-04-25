/**
 * プリセット作成用DTO
 */
export interface CreatePresetDto {
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

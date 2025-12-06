/**
 * プリセット作成用DTO
 */
export class CreatePresetDto {
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
   * 収入かどうか
   */
  isIncome: boolean;

  /**
   * カテゴリID
   */
  categoryId: number;
}

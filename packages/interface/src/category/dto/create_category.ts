/**
 * カテゴリ作成用DTO
 */
export interface CreateCategoryDto {
  /**
   * 名前
   */
  name: string;

  /**
   * 親カテゴリのID
   */
  parentId: number | null;
}

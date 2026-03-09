/**
 * カテゴリ更新用DTO
 */
export interface UpdateCategoryDto {
  /**
   * 名前
   */
  name: string;

  /**
   * 親カテゴリのID
   */
  parentId: number | null;
}

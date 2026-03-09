/**
 * カテゴリ取得用DTO
 */
export interface GetCategoryDto {
  /**
   * ID
   */
  id: number;

  /**
   * 名前
   */
  name: string;

  /**
   * 作成日
   */
  createdAt: string;

  /**
   * 更新日
   */
  updatedAt: string;
}

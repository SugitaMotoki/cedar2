/**
 * カテゴリツリー取得用DTO
 */
export interface GetCategoryTreeDto {
  /**
   * ID
   */
  id: number;

  /**
   * 名前
   */
  name: string;

  /**
   * 子要素
   */
  children: GetCategoryTreeDto[];

  /**
   * 作成日
   */
  createdAt: string;

  /**
   * 更新日
   */
  updatedAt: string;
}

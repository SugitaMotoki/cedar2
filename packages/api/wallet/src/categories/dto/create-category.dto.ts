/**
 * カテゴリ作成用DTO
 */
export class CreateCategoryDto {
  /**
   * 名前
   */
  name: string;

  /**
   * 親カテゴリのID
   */
  parentId: number | null;
}

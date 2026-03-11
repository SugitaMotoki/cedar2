/**
 * グループ取得用DTO
 */
export interface GetGroupDto {
  /**
   * ID
   */
  id: number;

  /**
   * 名前
   */
  name: string;

  /**
   * 作成者
   */
  createdBy: string;

  /**
   * 作成日
   */
  createdAt: Date;

  /**
   * 更新日
   */
  updatedAt: Date;
}

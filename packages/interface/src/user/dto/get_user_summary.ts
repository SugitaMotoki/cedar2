/**
 * ユーザ概要取得用DTO
 */
export interface GetUserSummaryDto {
  /**
   * ID
   */
  id: string;

  /**
   * 作成日
   */
  createdAt: string;

  /**
   * 更新日
   */
  updatedAt: string;
}

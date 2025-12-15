/**
 * グループ作成用DTO
 */
export interface CreateGroupDto {
  /**
   * 名前
   */
  name: string;

  /**
   * ユーザの通し番号
   */
  userNo: number;
}

/**
 * 実際の支払い追加用DTO
 */
export interface CreateActualDto {
  /**
   * ユーザの通し番号
   */
  userNo: number;

  /**
   * 金額
   */
  amount: number;
}

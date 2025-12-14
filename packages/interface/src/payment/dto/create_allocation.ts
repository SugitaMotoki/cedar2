/**
 * 支払い割り当て追加用DTO
 */
export interface CreateAllocationDto {
  /**
   * ユーザの通し番号
   */
  userNo: number;

  /**
   * 金額
   */
  amount: number;
}

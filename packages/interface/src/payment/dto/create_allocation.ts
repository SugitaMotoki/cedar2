/**
 * 支払い割り当て追加用DTO
 */
export interface CreateAllocationDto {
  /**
   * ユーザID
   */
  userId: string;

  /**
   * 金額
   */
  amount: number;
}

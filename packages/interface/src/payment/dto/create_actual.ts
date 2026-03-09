/**
 * 実際の支払い追加用DTO
 */
export interface CreateActualDto {
  /**
   * ユーザId
   */
  userId: string;

  /**
   * 金額
   */
  amount: number;
}

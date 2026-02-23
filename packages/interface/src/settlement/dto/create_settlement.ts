/**
 * 精算作成用DTO
 */
export interface CreateSettlementDto {
  /**
   * 支払ったユーザのID
   */
  from: string;

  /**
   * 支払われたユーザのID
   */
  to: string;

  /**
   * 金額
   */
  amount: number;

  /**
   * メモ
   */
  note: string;

  /**
   * 支払い
   */
  payments: number[];
}

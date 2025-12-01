/**
 * 精算作成用DTO
 */
export class CreateSettlementDto {
  /**
   * 支払ったユーザの通し番号
   */
  from: number;

  /**
   * 支払われたユーザの通し番号
   */
  to: number;

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

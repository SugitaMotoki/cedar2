/**
 * 精算要約取得用DTO
 */
export interface GetSettlementSummaryDto {
  /**
   * ID
   */
  id: number;

  /**
   * 金額
   */
  amount: number;

  /**
   * メモ
   */
  note: string;
}

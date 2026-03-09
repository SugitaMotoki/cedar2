/**
 * 支払い要約取得用DTO
 */
export interface GetPaymentSummaryDto {
  /**
   * ID
   */
  id: number;

  /**
   * タイトル
   */
  title: string;

  /**
   * メモ
   */
  note: string;

  /**
   * 支払い日
   */
  paymentDate: string;

  /**
   * 金額
   */
  amount: number;

  /**
   * 収入かどうか
   */
  isIncome: boolean;

  /**
   * 精算済みかどうか
   */
  isSettled: boolean;

  /**
   * 表示順
   */
  orderKey: number;

  /**
   * 作成日
   */
  createdAt: string;

  /**
   * 更新日
   */
  updatedAt: string;
}

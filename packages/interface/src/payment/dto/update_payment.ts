/**
 * 支払い更新用DTO
 */
export interface UpdatePaymentDto {
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
   * 並び替え用のキー
   */
  orderKey: number;

  /**
   * カテゴリID
   */
  categoryId: number;
}

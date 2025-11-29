/**
 * 支払い作成用DTO
 */
export class CreatePaymentDto {
  /**
   * グループID
   */
  groupId: number;

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
   * カテゴリID
   */
  categoryId: number;

  /**
   * 作成者
   */
  userNoOfcreatedBy: number;
}

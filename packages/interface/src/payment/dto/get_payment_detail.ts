import { GetPaymentActualDto } from "./get_actual";
import { GetPaymentAllocationDto } from "./get_allocation";

/**
 * 支払い詳細取得用DTO
 */
export interface GetPaymentDetailDto {
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

  /**
   * 支払い割り当て
   */
  allocation: GetPaymentAllocationDto[];

  /**
   * 実際の支払い
   */
  actuals: GetPaymentActualDto[];
}

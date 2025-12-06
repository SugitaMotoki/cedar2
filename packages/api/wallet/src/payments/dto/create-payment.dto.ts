import { AddActualDto } from "./add-actual.dto";
import { AddAllocationDto } from "./add-allocation.dto";

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

  /**
   * 支払い割り当て一覧
   */
  allocations: AddAllocationDto[];

  /**
   * 支払い割り当て一覧
   */
  actuals: AddActualDto[];
}

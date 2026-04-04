import { CreateActualDto } from "./create_actual";
import { CreateAllocationDto } from "./create_allocation";

/**
 * 支払い作成用DTO
 */
export interface CreatePaymentDto {
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
   * カテゴリID
   */
  categoryId: number;

  /**
   * 作成者
   */
  createdBy: string;

  /**
   * 支払い割り当て一覧
   */
  allocations: CreateAllocationDto[];

  /**
   * 支払い割り当て一覧
   */
  actuals: CreateActualDto[];
}

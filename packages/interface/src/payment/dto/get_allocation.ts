import { GetUserSummaryDto } from "../../user/dto/get_user_summary";

/**
 * 支払い割り当て取得用DTO
 */
export interface GetPaymentAllocationDto {
  /**
   * ID
   */
  id: number;

  /**
   * ユーザ
   */
  user: GetUserSummaryDto;

  /**
   * 金額
   */
  amount: number;

  /**
   * 作成日
   */
  createdAt: string;

  /**
   * 更新日
   */
  updatedAt: string;
}

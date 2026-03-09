import { GetUserSummaryDto } from "../../user/dto/get_user_summary";

/**
 * 実際の支払い取得用DTO
 */
export interface GetPaymentActualDto {
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

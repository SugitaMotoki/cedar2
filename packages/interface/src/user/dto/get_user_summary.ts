import { GetUserProfileDto } from "./get_user_profile";

/**
 * ユーザ取得用DTO
 */
export interface GetUserSummaryDto {
  /**
   * ID
   */
  id: string;

  /**
   * 作成日
   */
  createdAt: string;

  /**
   * 更新日
   */
  updatedAt: string;

  /**
   * プロフィール
   */
  profile: GetUserProfileDto;
}

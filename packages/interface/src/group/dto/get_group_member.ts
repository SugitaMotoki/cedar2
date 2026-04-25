import { GetUserSummaryDto } from "../../user";
import { GetGroupDto } from "./get_group";

/**
 * グループメンバ取得用DTO
 */
export interface GetGroupMemberDto {
  /**
   * ID
   */
  id: number;

  /**
   * グループ
   */
  group: GetGroupDto;

  /**
   * メンバ
   */
  member: GetUserSummaryDto;

  /**
   * 作成日
   */
  joinedAt: Date;
}

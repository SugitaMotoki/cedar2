import { GetUserSummaryDto } from "../../user";
import { GetGroupMemberDto } from "./get_group_member";

/**
 * グループ取得用DTO
 */
export interface GetGroupDto {
  /**
   * ID
   */
  id: number;

  /**
   * 名前
   */
  name: string;

  /**
   * 作成者
   */
  createdBy: GetUserSummaryDto;

  /**
   * 作成日
   */
  createdAt: Date;

  /**
   * 更新日
   */
  updatedAt: Date;

  /**
   * メンバ一覧
   */
  members: GetGroupMemberDto[];
}

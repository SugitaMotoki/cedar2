import { applyDecorators, UseGuards } from "@nestjs/common";
import { GroupMembersGuard } from "../guards/group-members.guard";

/**
 * グループ所属チェックを行うためのデコレータ
 */
export const CheckGroupMember = () =>
  applyDecorators(UseGuards(GroupMembersGuard));

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { GroupsService } from "./groups.service";
import type {
  CreateGroupDto,
  UpdateGroupDto,
  CreateMemberDto,
} from "@cedar2/interface";
import type { Request } from "express";
import { User } from "@/users/entities/user.entity";

/**
 * グループに関するコントローラ
 */
@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAllGroups();
  }

  @Get("own")
  findOwnGroups(@Req() req: Request) {
    const user = req.user as User;
    return this.groupsService.findByMember(user);
  }

  @Get(":groupId")
  findById(@Param("groupId") groupId: string) {
    return this.groupsService.findGroupByIdOrThrow(+groupId);
  }

  @Patch(":groupId")
  update(
    @Param("groupId") groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.updateGroup(+groupId, updateGroupDto);
  }

  @Delete(":groupId")
  remove(@Param("groupId") groupId: string) {
    return this.groupsService.removeGroup(+groupId);
  }

  @Post(":groupId/members")
  addMember(
    @Param("groupId") groupId: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return this.groupsService.addMemberToGroup(
      +groupId,
      createMemberDto.userId,
    );
  }

  @Get(":groupId/members")
  findAllMembersOrThrow(@Param("groupId") groupId: string) {
    return this.groupsService.findAllMembersByGroupId(+groupId);
  }
}

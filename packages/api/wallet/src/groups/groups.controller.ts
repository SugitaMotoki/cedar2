import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { AddMemberDto } from "./dto/add-member.dto";

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

  @Get(":groupId")
  findByIdOrThrow(@Param("groupId") groupId: string) {
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
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.groupsService.addMemberToGroup(+groupId, addMemberDto.userNo);
  }

  @Get(":groupId/members")
  findAllMembersOrThrow(@Param("groupId") groupId: string) {
    return this.groupsService.findAllMembersByGroupId(+groupId);
  }
}

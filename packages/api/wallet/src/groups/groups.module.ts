import { Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { UsersModule } from "@/users/users.module";
import { GroupMember } from "./entities/group-member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupMember]), UsersModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}

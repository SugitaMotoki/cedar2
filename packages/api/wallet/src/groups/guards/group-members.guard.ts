import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { GroupsService } from "../groups.service";
import { Request } from "express";
import { User } from "@/users/entities/user.entity";

/**
 * 認証されたユーザが指定されたグループに所属するかを判定するガード
 */
@Injectable()
export class GroupMembersGuard implements CanActivate {
  /**
   * コンストラクタ
   * @param groupsService
   */
  constructor(private readonly groupsService: GroupsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User; // JwtGuardでUser格納済み
    const groupIdStr = request.query.groupId ?? request.params.groupId;

    // グループIDが指定されていなければ特に処理しない
    if (!groupIdStr) {
      return true;
    }

    // グループIDが数値でなければ400エラー
    const groupId = Number(groupIdStr);
    if (isNaN(groupId)) {
      throw new BadRequestException();
    }

    // グループにユーザが所属していなければ404エラー
    const isMemberOfGroup = await this.groupsService.isMemberOfGroup(
      groupId,
      user,
    );
    if (!isMemberOfGroup) {
      throw new NotFoundException();
    }

    return true;
  }
}

import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@/users/entities/user.entity";
import { UsersService } from "@/users/users.service";
import { AUTH } from "@/constants";

/**
 * ローカルの認証ストラテジ
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  AUTH.PASSPORT_STRATEGY.LOCAL,
) {
  /**
   * コンストラクタ
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: "userId",
    });
  }

  /**
   * 検証メソッド
   * @param userId
   * @param password
   * @returns 認証済みのユーザ
   */
  async validate(userId: string, password: string): Promise<User> {
    const user = await this.usersService.validateIdAndPasswordOrNull(
      userId,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

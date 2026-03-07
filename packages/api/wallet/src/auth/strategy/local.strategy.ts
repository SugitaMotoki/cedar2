import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "@/users/entities/user.entity";

/**
 * ローカルの認証ストラテジ
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * コンストラクタ
   * @param authService
   */
  constructor(private authService: AuthService) {
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
    const user = await this.authService.validateUser(userId, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

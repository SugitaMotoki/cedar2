import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AUTH, ENV } from "@/constants";
import { JwtPayload } from "@cedar2/interface";
import { User } from "@/users/entities/user.entity";
import { UsersService } from "@/users/users.service";

/**
 * JWTの認証ストラテジ
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  AUTH.PASSPORT_STRATEGY.JWT,
) {
  /**
   * コンストラクタ
   * @param configService
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(ENV.WALLET.JWT_SECRET),
    });
  }

  /**
   * 検証メソッド
   * @param payload JWTのペイロード
   * @returns
   */
  async validate(payload: JwtPayload): Promise<User> {
    try {
      return this.usersService.findByIdOrThrow(payload.userId);
    } catch (e: unknown) {
      throw new UnauthorizedException(e);
    }
  }
}

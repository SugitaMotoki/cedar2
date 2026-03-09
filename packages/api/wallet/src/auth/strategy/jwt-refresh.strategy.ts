import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ENV } from "@/constants";
import { JwtPayload } from "@cedar2/interface";
import { User } from "@/users/entities/user.entity";
import { UsersService } from "@/users/users.service";
import { Request } from "express";

/**
 * JWTの認証ストラテジ
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
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
      secretOrKey: configService.getOrThrow<string>(
        ENV.WALLET.JWT_REFRESH_SECRET,
      ),
      passReqToCallback: true,
    });
  }

  /**
   * 検証メソッド
   * リフレッシュトークンが切れていないかDBと照合する
   * @param req リクエストオブジェクト
   * @param payload JWTのペイロード
   * @returns
   */
  async validate(req: Request, payload: JwtPayload): Promise<Readonly<User>> {
    // ヘッダから認証情報を取得
    const refreshToken = req.get("Authorization")!.replace("Bearer", "").trim();

    // 検証
    const user = await this.usersService.validateRefreshTokenOrNull(
      payload.userId,
      refreshToken,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

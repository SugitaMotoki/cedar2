import { AUTH, ENV } from "@/constants";
import { User } from "@/users/entities/user.entity";
import { UsersService } from "@/users/users.service";
import { JwtPayload, LoginResponse } from "@cedar2/interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

/**
 * 認証に関するサービス
 */
@Injectable()
export class AuthService {
  /**
   * コンストラクタ
   * @param usersService
   * @param jwtService
   * @param configService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * ログインするメソッド
   * @param user
   */
  async login(user: User): Promise<LoginResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      // アクセストークンの発行
      this.createAccessToken(user),
      // リフレッシュトークンの発行とDBへの格納
      (async () => {
        const refreshToken = await this.createRefreshToken(user);
        await this.usersService.updateRefreshToken(user.id, refreshToken);
        return refreshToken;
      })(),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * アクセストークンを発行するメソッド
   * @param user
   * @returns アクセストークン
   */
  private createAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = { userId: user.id };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(ENV.WALLET.JWT_SECRET),
      expiresIn: AUTH.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  /**
   * リフレッシュトークンを発行するメソッド
   * @param user
   * @returns リフレッシュトークン
   */
  private createRefreshToken(user: User): Promise<string> {
    const payload: JwtPayload = { userId: user.id };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(ENV.WALLET.JWT_REFRESH_SECRET),
      expiresIn: AUTH.REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  /**
   * ログアウトするメソッド
   * @param user
   */
  async logout(user: User) {
    await this.usersService.clearRefreshToken(user.id);
  }
}

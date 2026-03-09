import { AUTH } from "@/constants";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * リフレッシュトークン用のJWTの認証のためのガード
 * jwt-refresh.strategy.tsを参照
 */
@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(
  AUTH.PASSPORT_STRATEGY.JWT_REFRESH,
) {}

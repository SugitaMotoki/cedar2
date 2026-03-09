import { AUTH } from "@/constants";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

/**
 * JWT認証のためのガード
 * jwt.strategy.tsを参照
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH.PASSPORT_STRATEGY.JWT) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // @IgnoreJwtAuthGuard()がついている場合は処理をスキップする
    const isIgnore = this.reflector.getAllAndOverride<boolean>(
      AUTH.IGNORE_JWT_AUTH_GUARD,
      [context.getHandler(), context.getClass()],
    );
    if (isIgnore) {
      return true;
    }
    return super.canActivate(context);
  }
}

import { AUTH } from "@/constants";
import { SetMetadata } from "@nestjs/common";

/**
 * JWT認証なしでアクセス可能なエンドポイントを表すデコレータ
 */
export const IgnoreJwtAuthGuard = () =>
  SetMetadata(AUTH.IGNORE_JWT_AUTH_GUARD, true);

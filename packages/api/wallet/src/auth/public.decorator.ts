import { AUTH } from "@/constants";
import { SetMetadata } from "@nestjs/common";

/**
 * 認証なしでアクセス可能なエンドポイントを表すデコレータ
 */
export const Public = () => SetMetadata(AUTH.IS_PUBLIC_KEY, true);

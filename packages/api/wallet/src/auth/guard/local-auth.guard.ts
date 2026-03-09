import { AUTH } from "@/constants";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * ローカル認証のためのガード
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard(AUTH.PASSPORT_STRATEGY.LOCAL) {}

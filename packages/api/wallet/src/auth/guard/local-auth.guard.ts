import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * ローカル認証のためのガード
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}

import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request } from "express";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { User } from "@/users/entities/user.entity";
import { IgnoreJwtAuthGuard } from "./ignore-jwt-auth-guard.decorator";
import { JwtRefreshAuthGuard } from "./guard/jwt-refresh-auth.guard";
import { LoginResponse } from "@cedar2/interface";

/**
 * 認証に関するコントローラ
 */
@Controller("auth")
export class AuthController {
  /**
   * コンストラクタ
   * @param authService
   * @param usersService
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * ログインをするメソッド
   * @param req
   * @returns
   */
  @IgnoreJwtAuthGuard()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request): Promise<LoginResponse> {
    const user = req.user as User;
    return this.authService.login(user);
  }

  /**
   * アクセストークンが切れた際にリフレッシュトークンを使って再ログインするメソッド
   * @param req
   * @returns
   */
  @IgnoreJwtAuthGuard()
  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  async refresh(@Req() req: Request): Promise<LoginResponse> {
    const user = req.user as User;
    return this.authService.login(user);
  }

  /**
   * ログイン中のユーザ情報を取得するメソッド
   * @param req
   * @returns
   */
  @Get("profile")
  getProfile(@Req() req: Request): Readonly<User> {
    const user = req.user as User;
    return user;
  }

  /**
   * ログアウトをするメソッド
   * @param req
   */
  @Post("logout")
  async logout(@Req() req: Request) {
    const user = req.user as User;
    await this.authService.logout(user);
  }
}

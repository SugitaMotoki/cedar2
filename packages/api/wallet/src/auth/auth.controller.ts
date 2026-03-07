import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request } from "express";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { User } from "@/users/entities/user.entity";
import { Public } from "./public.decorator";

/**
 * 認証に関するコントローラ
 */
@Controller("auth")
export class AuthController {
  /**
   * コンストラクタ
   * @param authService
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * ログインをするメソッド
   * @param req
   * @returns
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: Request) {
    const user = req.user as User; // ガードによりUserが入る
    const accessToken = this.authService.login(user);
    return {
      accessToken,
    };
  }

  @Get("profile")
  getProfile(@Req() req: Request) {
    return req.user;
  }

  logout(@Req() req: Request) {
    return req.logout(() => {});
  }
}

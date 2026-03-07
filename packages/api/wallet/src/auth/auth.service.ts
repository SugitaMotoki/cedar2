import { User } from "@/users/entities/user.entity";
import { UsersService } from "@/users/users.service";
import { JwtPayload } from "@cedar2/interface";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

/**
 * 認証に関するサービス
 */
@Injectable()
export class AuthService {
  /**
   * コンストラクタ
   * @param usersService ユーザに関するサービス
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * ユーザを認証するメソッド
   * @param userId ユーザID
   * @param password パスワード
   * @returns 認証成功ならユーザ情報、失敗ならnull
   */
  async validateUser(
    userId: string,
    password: string,
  ): Promise<Readonly<User> | null> {
    const user = await this.usersService.findWithPasswordByIdOrNull(userId);
    if (!user || !user.password) {
      return null;
    }
    return (await compare(password, user.password)) ? user : null;
  }

  /**
   * ログイン処理を行うメソッド
   * @param user
   * @returns
   */
  login(user: User): string {
    const payload: JwtPayload = { userId: user.id };
    return this.jwtService.sign(payload);
  }
}

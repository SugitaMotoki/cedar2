import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";
import { Request } from "express";
import { User } from "../entities/user.entity";

/**
 * リクエストからユーザまたはユーザのプロパティを抽出するデコレータ
 */
export const ReqUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as User; // JwtGuardでユーザが入る

    if (!data) {
      return user;
    }

    if (!(data in user)) {
      throw new InternalServerErrorException(
        `Property "${data}" does not exist on User entity.`,
      );
    }

    return user[data as keyof User];
  },
);

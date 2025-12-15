import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import type { CreateUserDto, UpdateUserDto } from "@cedar2/interface";

/**
 * ユーザに関するコントローラ
 */
@Controller("users")
export class UsersController {
  /**
   * コンストラクタ
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":no")
  findByNoOrThrow(@Param("no") no: string) {
    return this.usersService.findByNoOrThrow(+no); // TODO: 型チェック
  }

  @Get(":id")
  findByIdOrThrow(@Param("id") id: string) {
    return this.usersService.findByIdOrThrow(id);
  }

  @Patch(":no")
  update(@Param("no") no: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+no, updateUserDto);
  }

  @Delete(":no")
  remove(@Param("no") no: string) {
    return this.usersService.remove(+no);
  }
}

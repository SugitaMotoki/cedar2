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
import type { CreateUserDto, UpdateUserProfileDto } from "@cedar2/interface";
import { IgnoreJwtAuthGuard } from "@/auth/decorators/ignore-jwt-auth-guard.decorator";

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

  @IgnoreJwtAuthGuard()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findByIdOrThrow(@Param("id") id: string) {
    return this.usersService.findByIdOrThrow(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProfileDto: UpdateUserProfileDto,
  ) {
    return this.usersService.updateProfile(id, updateProfileDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}

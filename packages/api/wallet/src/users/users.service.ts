import { Injectable } from "@nestjs/common";
import type { CreateUserDto, UpdateUserDto } from "@cedar2/interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";

/**
 * ユーザに関するサービス
 */
@Injectable()
export class UsersService {
  /**
   * コンストラクタ
   * @param usersRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * ユーザを作成するメソッド
   * @param createUserDto
   * @returns 作成したユーザ
   */
  async create(createUserDto: CreateUserDto): Promise<Readonly<User>> {
    const user = new User({ ...createUserDto });
    await this.usersRepository.save(user);
    user.password = "The password has been hidden.";
    return user;
  }

  /**
   * 全てのユーザを取得するメソッド
   * @returns 全てのユーザ
   */
  findAll(): Promise<Readonly<User[]>> {
    return this.usersRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定されたグループに所属するユーザを取得するメソッド
   * @param groupId グループID
   * @returns 指定されたグループに所属するユーザ
   */
  findByGroupIdOrThrow(groupId: number): Promise<Readonly<User[]>> {
    return this.usersRepository.find({
      where: {
        groups: {
          group: {
            id: groupId,
          },
        },
      },
    });
  }

  /**
   * 指定されたIDのユーザを取得するメソッド
   * @param id ID
   * @returns 指定されたIDのユーザ（なければエラー）
   */
  findByIdOrThrow(id: string): Promise<Readonly<User>> {
    return this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  /**
   * 指定されたIDのユーザをパスワード付きで取得するメソッド
   * @param id ID
   * @returns 指定されたIDのユーザ（なければnull）
   */
  findWithPasswordByIdOrNull(id: string): Promise<Readonly<User> | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * 指定されたIDのユーザを更新するメソッド
   * @param id ID
   * @param updateUserDto
   * @returns 更新結果
   */
  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Readonly<UpdateResult>> {
    const user = new User({ ...updateUserDto });
    return this.usersRepository.update({ id }, user);
  }

  /**
   * 指定されたIDのユーザを削除するメソッド
   * @param id ID
   * @returns 削除結果
   */
  remove(id: string): Promise<Readonly<DeleteResult>> {
    return this.usersRepository.delete({ id });
  }
}

import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
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
   * 指定された通し番号のユーザを取得するメソッド
   * @param no 通し番号
   * @returns 指定された通し番号のユーザ（なければエラー）
   */
  findByNoOrThrow(no: number): Promise<Readonly<User>> {
    return this.usersRepository.findOneOrFail({
      where: {
        no,
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
   * 指定された通し番号のユーザを更新するメソッド
   * @param no 通し番号
   * @param updateUserDto
   * @returns 更新結果
   */
  async update(
    no: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Readonly<UpdateResult>> {
    const user = new User({ ...updateUserDto });
    const updateResult = await this.usersRepository.update(no, user);
    return updateResult;
  }

  /**
   * 指定された通し番号のユーザを削除するメソッド
   * @param no 通し番号
   * @returns 削除結果
   */
  async remove(no: number): Promise<Readonly<DeleteResult>> {
    const deleteResult = await this.usersRepository.delete(no);
    return deleteResult;
  }
}

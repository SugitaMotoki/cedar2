import { Injectable } from "@nestjs/common";
import type { CreateUserDto, UpdateUserProfileDto } from "@cedar2/interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";
import { compareSync, genSalt, hash } from "bcrypt";
import { UserProfile } from "./entities/user-profile.entity";

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
    @InjectRepository(UserProfile)
    private readonly userProfilesRepository: Repository<UserProfile>,
  ) {}

  /**
   * ユーザを作成するメソッド
   * @param createUserDto
   * @returns 作成したユーザ
   */
  async create({ id, password }: CreateUserDto): Promise<Readonly<User>> {
    const salt = await genSalt();
    const user = new User({
      id,
      password: await hash(password, salt),
      profile: new UserProfile({
        id, // プロフィールのIDはユーザのIDと同一
        displayName: id, // 表示名も初期値はID
      }),
    });
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
      relations: {
        profile: true,
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
      relations: {
        profile: true,
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
      relations: {
        profile: true,
      },
    });
  }

  /**
   * 指定されたIDのユーザプロフィールを更新するメソッド
   * @param id ID
   * @param updateProfileDto
   * @returns 更新結果
   */
  updateProfile(
    id: string,
    updateProfileDto: UpdateUserProfileDto,
  ): Promise<Readonly<UpdateResult>> {
    const profile = new UserProfile({ ...updateProfileDto });
    return this.userProfilesRepository.update({ id }, profile);
  }

  /**
   * リフレッシュトークンをハッシュ化して更新するメソッド
   * @param id ユーザID
   * @param refreshToken
   */
  async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<Readonly<UpdateResult>> {
    const salt = await genSalt();
    const hashedRefreshToken = await hash(refreshToken, salt);
    const user = new User({
      refreshToken: hashedRefreshToken,
    });
    return this.usersRepository.update({ id }, user);
  }

  /**
   * リフレッシュトークンを削除するメソッド
   * @param id
   * @returns
   */
  clearRefreshToken(id: string): Promise<Readonly<UpdateResult>> {
    const user = new User({
      refreshToken: undefined,
    });
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

  /**
   * ユーザのIDとPWを認証するメソッド
   * @param id
   * @param password
   * @returns 認証に成功したらユーザ、失敗したらnull
   */
  async validateIdAndPasswordOrNull(
    id: string,
    password: string,
  ): Promise<Readonly<User> | null> {
    const user = await this.usersRepository.findOne({
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
    if (!user || !user.password) {
      return null;
    }
    return compareSync(password, user.password) ? user : null;
  }

  /**
   * ユーザのリフレッシュトークンを認証するメソッド
   * @param id
   * @param password
   * @returns 認証に成功したらユーザ、失敗したらnull
   */
  async validateRefreshTokenOrNull(
    id: string,
    refreshToken: string,
  ): Promise<Readonly<User> | null> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        refreshToken: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user || !user.refreshToken) {
      return null;
    }
    return compareSync(refreshToken, user.refreshToken) ? user : null;
  }
}

import { Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";
import { UsersService } from "@/users/users.service";

/**
 * グループに関するサービス
 */
@Injectable()
export class GroupsService {
  /**
   * コンストラクタ
   * @param groupsRepository
   * @param usersService
   */
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * グループを作成するメソッド
   * @param createGroupDto
   * @returns 作成したグループ
   */
  async create(createGroupDto: CreateGroupDto): Promise<Readonly<Group>> {
    const createdBy = await this.usersService.findByNoOrThrow(
      createGroupDto.userNo,
    );
    const group = new Group({
      name: createGroupDto.name,
      createdBy,
    });
    await this.groupsRepository.save(group);
    return group;
  }

  /**
   * 全てのグループを取得するメソッド
   * @returns 全てのグループ
   */
  findAll(): Promise<Readonly<Group[]>> {
    return this.groupsRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定されたIDのグループを取得するメソッド
   * @param id ID
   * @returns 指定されたIDのグループ（なければエラー）
   */
  findByIdOrThrow(id: number): Promise<Readonly<Group>> {
    return this.groupsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  /**
   * 指定されたIDのグループを更新するメソッド
   * @param id ID
   * @param updateGroupDto
   * @returns 更新結果
   */
  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = new Group({ ...updateGroupDto });
    const updateResult = await this.groupsRepository.update(id, group);
    return updateResult;
  }

  /**
   * 指定されたIDのグループを削除するメソッド
   * @param id ID
   * @returns 削除結果
   */
  async remove(id: number) {
    const deleteResult = await this.groupsRepository.delete(id);
    return deleteResult;
  }
}

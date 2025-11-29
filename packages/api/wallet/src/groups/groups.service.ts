import { Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";
import { UsersService } from "@/users/users.service";
import { GroupMember } from "./entities/group-member.entity";
import { User } from "@/users/entities/user.entity";

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
    @InjectRepository(GroupMember)
    private readonly groupMembersRepository: Repository<GroupMember>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * グループを作成するメソッド
   * @param createGroupDto
   * @returns 作成したグループ
   */
  async createGroup(createGroupDto: CreateGroupDto): Promise<Readonly<Group>> {
    const createdBy = await this.usersService.findByNoOrThrow(
      createGroupDto.userNo,
    );
    const group = new Group({
      name: createGroupDto.name,
      createdBy,
    });
    await this.groupsRepository.save(group);
    await this.addMemberToGroup(group.id, group.createdBy.no);
    return group;
  }

  /**
   * 全てのグループを取得するメソッド
   * @returns 全てのグループ
   */
  findAllGroups(): Promise<Readonly<Group[]>> {
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
  findGroupByIdOrThrow(id: number): Promise<Readonly<Group>> {
    return this.groupsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        members: {
          member: true,
        },
      },
    });
  }

  /**
   * 指定されたIDのグループを更新するメソッド
   * @param id ID
   * @param updateGroupDto
   * @returns 更新結果
   */
  async updateGroup(id: number, updateGroupDto: UpdateGroupDto) {
    const group = new Group({ ...updateGroupDto });
    const updateResult = await this.groupsRepository.update(id, group);
    return updateResult;
  }

  /**
   * 指定されたIDのグループを削除するメソッド
   * @param id ID
   * @returns 削除結果
   */
  async removeGroup(id: number) {
    const deleteResult = await this.groupsRepository.delete(id);
    return deleteResult;
  }

  /**
   * グループにメンバを追加するメソッド
   * @param groupId グループID
   * @param userNo ユーザの通し番号
   * @returns 追加したグループメンバ
   */
  async addMemberToGroup(groupId: number, userNo: number) {
    const groupMember = new GroupMember({
      group: new Group({ id: groupId }),
      member: new User({ no: userNo }),
    });
    await this.groupMembersRepository.save(groupMember);
    return groupMember;
  }

  /**
   * グループの全てのメンバ一覧を取得するメソッド
   * @returns 全てのグループ
   */
  findAllMembersByGroupId(groupId: number): Promise<Readonly<GroupMember[]>> {
    return this.groupMembersRepository.find({
      where: {
        group: new Group({ id: groupId }),
      },
      relations: {
        member: true,
      },
    });
  }
}

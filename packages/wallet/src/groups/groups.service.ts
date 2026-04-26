import { Injectable } from "@nestjs/common";
import type { CreateGroupDto, UpdateGroupDto } from "@cedar2/interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";
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
  ) {}

  /**
   * グループを作成するメソッド
   * @returns 作成したグループ
   */
  async createGroup({
    name,
    createdBy,
  }: CreateGroupDto): Promise<Readonly<Group>> {
    const group = new Group({
      name,
      createdBy: new User({ id: createdBy }),
    });
    await this.groupsRepository.save(group);
    await this.addMemberToGroup(group.id, group.createdBy.id);
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
   * 指定されたユーザが所属するグループを取得するメソッド
   * @param member
   */
  async findByMember(member: User): Promise<Readonly<Group[]>> {
    return this.groupsRepository.find({
      where: {
        members: {
          member: {
            id: member.id,
          },
        },
      },
      relations: {
        createdBy: true,
      },
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
          member: {
            profile: true,
          },
        },
        payments: true,
      },
    });
  }

  /**
   * 指定されたIDのグループにユーザが所属するかを判定するメソッド
   * @param groupId グループID
   * @param user
   */
  isMemberOfGroup(groupId: number, user: User): Promise<boolean> {
    return this.groupsRepository.exists({
      where: {
        id: groupId,
        members: {
          member: {
            id: user.id,
          },
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
  updateGroup(id: number, updateGroupDto: UpdateGroupDto) {
    const group = new Group({ ...updateGroupDto });
    return this.groupsRepository.update(id, group);
  }

  /**
   * 指定されたIDのグループを削除するメソッド
   * @param id ID
   * @returns 削除結果
   */
  removeGroup(id: number) {
    return this.groupsRepository.delete(id);
  }

  /**
   * グループにメンバを追加するメソッド
   * @param groupId グループID
   * @param userId ユーザID
   * @returns 追加したグループメンバ
   */
  async addMemberToGroup(groupId: number, userId: string) {
    const groupMember = new GroupMember({
      group: new Group({ id: groupId }),
      member: new User({ id: userId }),
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

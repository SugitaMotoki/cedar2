import {
  type Relation,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Group } from "./group.entity";
import { User } from "@/users/entities/user.entity";

/**
 * グループメンバーを表すエンティティ
 */
@Entity()
@Unique(["group", "member"])
export class GroupMember {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * グループ
   */
  @ManyToOne(() => Group, (group) => group.members, {
    nullable: false,
  })
  group: Relation<Group>;

  /**
   * メンバ
   */
  @ManyToOne(() => User, (user) => user.groups, {
    nullable: false,
  })
  member: Relation<User>;

  /**
   * 作成日
   */
  @CreateDateColumn({
    update: false,
  })
  joinedAt: Date;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<GroupMember>) {
    Object.assign(this, partial);
  }
}

import { GroupMember } from "@/groups/entities/group-member.entity";
import {
  type Relation,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * ユーザを表すエンティティ
 */
@Entity()
export class User {
  /**
   * 通し番号
   */
  @PrimaryGeneratedColumn()
  no: number;

  /**
   * ID
   */
  @Column({
    unique: true,
  })
  id: string;

  /**
   * パスワード
   */
  @Column({
    select: false,
  })
  password: string;

  /**
   * 作成日
   */
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  /**
   * 更新日
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * グループ一覧
   */
  @OneToMany(() => GroupMember, (groupMember) => groupMember.member)
  groups: Relation<GroupMember[]>;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}

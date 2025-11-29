import { User } from "@/users/entities/user.entity";
import {
  type Relation,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * グループを表すエンティティ
 */
@Entity()
export class Group {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 名前
   */
  @Column()
  name: string;

  /**
   * 作成者
   */
  @ManyToOne(() => User, (user) => user.ownedGroups, {
    nullable: false,
  })
  createdBy: Relation<User>;

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
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<Group>) {
    Object.assign(this, partial);
  }
}

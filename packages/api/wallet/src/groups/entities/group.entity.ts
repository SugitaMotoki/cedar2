import { User } from "@/users/entities/user.entity";
import {
  type Relation,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GroupMember } from "./group-member.entity";
import { Payment } from "@/payments/entities/payment.entity";

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
  @ManyToOne(() => User, {
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
   * メンバ一覧
   */
  @OneToMany(() => GroupMember, (groupMember) => groupMember.group)
  members: Relation<GroupMember[]>;

  /**
   * 支払い一覧
   */
  @OneToMany(() => Payment, (payment) => payment.group)
  payments: Relation<Payment[]>;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<Group>) {
    Object.assign(this, partial);
  }
}

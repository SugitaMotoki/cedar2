import { GroupMember } from "@/groups/entities/group-member.entity";
import { PaymentActual } from "@/payments/entities/payment-actual.entity";
import { PaymentAllocation } from "@/payments/entities/payment-allocation.entity";
import {
  type Relation,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserProfile } from "./user-profile.entity";

/**
 * ユーザを表すエンティティ
 */
@Entity()
export class User {
  /**
   * ID
   */
  @PrimaryColumn()
  id: string;

  /**
   * パスワード
   */
  @Column({
    select: false,
  })
  password: string;

  /**
   * リフレッシュトークン
   */
  @Column({
    nullable: true,
    select: false,
  })
  refreshToken?: string;

  /**
   * プロフィール
   */
  @OneToOne(() => UserProfile, (profile) => profile.user, {
    cascade: ["insert"],
  })
  @JoinColumn()
  profile: Relation<UserProfile>;

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
   * 支払い割り当て
   */
  @OneToMany(() => PaymentAllocation, (allocation) => allocation.user)
  allocations: Relation<PaymentAllocation[]>;

  /**
   * 実際の支払い
   */
  @OneToMany(() => PaymentActual, (actual) => actual.user)
  actuals: Relation<PaymentActual[]>;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}

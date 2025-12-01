import { Category } from "@/categories/entities/category.entity";
import { Group } from "@/groups/entities/group.entity";
import { User } from "@/users/entities/user.entity";
import {
  type Relation,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentAllocation } from "./payment-allocation.entity";
import { PaymentActual } from "./payment-actual.entity";
import { Settlement } from "@/settlements/entities/settlement.entity";

/**
 * 支払いに関するエンティティ
 */
@Entity()
export class Payment {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * グループ
   */
  @ManyToOne(() => Group, (group) => group.payments)
  group: Relation<Group>;

  /**
   * タイトル
   */
  @Column()
  title: string;

  /**
   * メモ
   */
  @Column()
  note: string;

  /**
   * 支払い日
   */
  @Column({ type: "date" })
  paymentDate: string;

  /**
   * 金額
   */
  @Column()
  amount: number;

  /**
   * 収入かどうか
   */
  @Column()
  isIncome: boolean;

  /**
   * 精算済みかどうか
   */
  @Column()
  isSettled: boolean;

  /**
   * 並び替え用のキー
   */
  @Column()
  orderKey: number;

  /**
   * カテゴリ
   */
  @ManyToOne(() => Category)
  category: Relation<Category>;

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
   * 支払い割り当て
   */
  @OneToMany(() => PaymentAllocation, (allocation) => allocation.payment)
  allocations: Relation<PaymentAllocation[]>;

  /**
   * 実際の支払い
   */
  @OneToMany(() => PaymentActual, (actual) => actual.payment)
  actuals: Relation<PaymentActual[]>;

  /**
   * 精算
   */
  @ManyToMany(() => Settlement, (settlement) => settlement.payments)
  settlements: Relation<Settlement[]>;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<Payment>) {
    Object.assign(this, partial);
  }
}

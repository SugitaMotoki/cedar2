import { Payment } from "@/payments/entities/payment.entity";
import { User } from "@/users/entities/user.entity";
import {
  type Relation,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * 精算を表すエンティティ
 */
@Entity()
export class Settlement {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 支払ったユーザ
   */
  @ManyToOne(() => User)
  from: Relation<User>;

  /**
   * 支払われたユーザ
   */
  @ManyToOne(() => User)
  to: Relation<User>;

  /**
   * 金額
   */
  @Column()
  amount: number;

  /**
   * メモ
   */
  @Column()
  note: string;

  /**
   * 支払い一覧
   */
  @ManyToMany(() => Payment, (payment) => payment.settlements)
  @JoinTable()
  payments: Relation<Payment[]>;

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
  constructor(partial?: Partial<Settlement>) {
    Object.assign(this, partial);
  }
}

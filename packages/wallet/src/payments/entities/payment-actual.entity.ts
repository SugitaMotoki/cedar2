import {
  type Relation,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Payment } from "./payment.entity";
import { User } from "@/users/entities/user.entity";

/**
 * 実際の支払いを表すエンティティ
 */
@Entity()
@Unique(["payment", "user"])
export class PaymentActual {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 支払い
   */
  @ManyToOne(() => Payment, (payment) => payment.actuals)
  payment: Relation<Payment>;

  /**
   * ユーザ
   */
  @ManyToOne(() => User, (user) => user.actuals)
  user: Relation<User>;

  /**
   * 金額
   */
  @Column()
  amount: number;

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
  constructor(partial?: Partial<PaymentActual>) {
    Object.assign(this, partial);
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
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
  @Column()
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
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}

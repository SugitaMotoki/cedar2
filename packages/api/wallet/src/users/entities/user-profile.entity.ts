import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  type Relation,
} from "typeorm";
import { User } from "./user.entity";

/**
 * ユーザのプロフィール情報を表すエンティティ
 */
@Entity()
export class UserProfile {
  /**
   * ID
   */
  @PrimaryColumn()
  id: string;

  /**
   * 表示名
   */
  @Column()
  displayName: string;

  /**
   * 生年月日
   */
  @Column({ nullable: true, type: "date" })
  birthday?: string;

  /**
   * 自己紹介
   */
  @Column({ nullable: true })
  bio?: string;

  /**
   * アイコン画像のURL
   */
  @Column({ nullable: true })
  avatarUrl?: string;

  /**
   * タイムゾーン
   */
  @Column({ default: "Asia/Tokyo" })
  timezone: string;

  /**
   * 言語設定
   */
  @Column({ default: "ja" })
  language: string;

  /**
   * ユーザへのリレーション (1対1)
   */
  @OneToOne(() => User, (user) => user.profile)
  user: Relation<User>;

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
  constructor(partial?: Partial<UserProfile>) {
    Object.assign(this, partial);
  }
}

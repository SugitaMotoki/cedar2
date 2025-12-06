import { Category } from "@/categories/entities/category.entity";
import { Group } from "@/groups/entities/group.entity";
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
 * プリセットを表すエンティティ
 */
@Entity()
export class Preset {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * グループ
   */
  @ManyToOne(() => Group)
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
   * 収入かどうか
   */
  @Column()
  isIncome: boolean;

  /**
   * カテゴリ
   */
  @ManyToOne(() => Category)
  category: Relation<Category>;

  /**
   * 使用回数
   */
  @Column()
  frequency: number;

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
  constructor(partial?: Partial<Preset>) {
    Object.assign(this, partial);
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";

/**
 * カテゴリを表すエンティティ
 */
@Entity()
@Tree("closure-table")
export class Category {
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
   * 親カテゴリ
   */
  @TreeParent()
  parent: Category;

  /**
   * 子カテゴリ
   */
  @TreeChildren()
  children: Category[];

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
  constructor(partial?: Partial<Category>) {
    Object.assign(this, partial);
  }
}

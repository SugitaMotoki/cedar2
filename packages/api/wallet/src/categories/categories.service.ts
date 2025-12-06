import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { TreeRepository } from "typeorm";

/**
 * カテゴリに関するサービス
 */
@Injectable()
export class CategoriesService {
  /**
   * コンストラクタ
   * @param categoriesRepository
   */
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: TreeRepository<Category>,
  ) {}

  /**
   * カテゴリを作成するメソッド
   * @param createCategoryDto
   * @returns 作成したカテゴリ
   */
  async create({
    name,
    parentId,
  }: CreateCategoryDto): Promise<Readonly<Category>> {
    const category = new Category({
      name,
      parent: parentId !== null ? new Category({ id: parentId }) : undefined,
    });
    await this.categoriesRepository.save(category);
    return category;
  }

  /**
   * 全てのカテゴリをツリー状で取得するメソッド
   * @returns 全てのカテゴリ（ツリー）
   */
  findTree(): Promise<Readonly<Category[]>> {
    return this.categoriesRepository.findTrees();
  }

  /**
   * 全てのカテゴリをID順で取得するメソッド
   * @returns 全てのカテゴリ
   */
  findAll(): Promise<Readonly<Category[]>> {
    return this.categoriesRepository.find({
      order: {
        id: "ASC",
      },
    });
  }

  /**
   * 指定されたIDのカテゴリを取得するメソッド
   * @param id ID
   * @returns 指定されたIDのカテゴリ（なければエラー）
   */
  findByIdOrThrow(id: number): Promise<Readonly<Category>> {
    return this.categoriesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  /**
   * 指定されたIDのカテゴリを更新するメソッド
   * @param id ID
   * @param updateCategoryDto
   * @returns 更新結果
   */
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = new Category({ ...updateCategoryDto });
    return this.categoriesRepository.update(id, category);
  }

  /**
   * 指定されたIDのカテゴリを削除するメソッド
   * @param id ID
   * @returns 削除結果
   */
  remove(id: number) {
    return this.categoriesRepository.delete(id);
  }
}

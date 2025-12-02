import { Injectable } from "@nestjs/common";
import { CreatePresetDto } from "./dto/create-preset.dto";
import { UpdatePresetDto } from "./dto/update-preset.dto";
import { Preset } from "./entities/preset.entity";
import { Group } from "@/groups/entities/group.entity";
import { Category } from "@/categories/entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/**
 * プリセット
 */
@Injectable()
export class PresetsService {
  /**
   * コンストラクタ
   * @param presetsRepository
   */
  constructor(
    @InjectRepository(Preset)
    private readonly presetsRepository: Repository<Preset>,
  ) {}

  /**
   * プリセットを作成するメソッド
   * @returns 作成した支払い
   */
  async createPreset({
    groupId,
    title,
    note,
    isIncome,
    categoryId,
  }: CreatePresetDto): Promise<Readonly<Preset>> {
    const preset = new Preset({
      group: new Group({ id: groupId }),
      title,
      note,
      isIncome,
      category: new Category({ id: categoryId }),
      frequency: 0,
    });
    await this.presetsRepository.save(preset);
    return preset;
  }

  /**
   * 全てのプリセットを取得するメソッド
   * @returns 全てのプリセット
   */
  findAllPresets(): Promise<Readonly<Preset[]>> {
    return this.presetsRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定されたIDのプリセットを取得するメソッド
   * @param id
   * @returns 指定されたIDのプリセット（なければエラー）
   */
  findPresetByIdOrThrow(id: number) {
    return this.presetsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        group: true,
        category: true,
      },
    });
  }

  /**
   * 指定されたIDのプリセットを更新するメソッド
   * @param id
   * @returns 更新結果
   */
  updatePreset(
    id: number,
    { groupId, title, note, isIncome, categoryId }: UpdatePresetDto,
  ) {
    const preset = new Preset({
      group: groupId !== undefined ? new Group({ id: groupId }) : undefined,
      title,
      note,
      isIncome,
      category:
        categoryId !== undefined ? new Category({ id: categoryId }) : undefined,
    });
    return this.presetsRepository.update(id, preset);
  }

  /**
   * 指定されたIDのプリセットを削除するメソッド
   * @param id
   * @returns 削除結果
   */
  removePreset(id: number) {
    return this.presetsRepository.delete(id);
  }
}

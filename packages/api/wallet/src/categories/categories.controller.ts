import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

/**
 * カテゴリに関するコントローラ
 */
@Controller("categories")
export class CategoriesController {
  /**
   * コンストラクタ
   * @param categoriesService
   */
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findTree();
    // return this.categoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findByIdOrNull(+id); // TODO: 型チェック
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}

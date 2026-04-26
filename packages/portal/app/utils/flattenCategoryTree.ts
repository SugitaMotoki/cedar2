import type { GetCategoryTreeDto, GetCategoryDto } from "@cedar2/interface";

/**
 * 木構造のカテゴリを平坦な配列にする関数
 * @param categoryTree
 * @param prefix
 * @returns
 */
export const flattenCategoryTree = (
  categoryTree: GetCategoryTreeDto[],
  prefix = "",
): GetCategoryDto[] => {
  return categoryTree.flatMap((category) => {
    const currentName = `${prefix}${category.name}`;
    const currentCategory = {
      id: category.id,
      name: currentName,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
    return [
      currentCategory,
      ...(category.children.length !== 0
        ? flattenCategoryTree(category.children, `${currentName} / `)
        : []),
    ];
  });
};

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type {
  CreatePaymentDto,
  GetCategoryDto,
  GetCategoryTreeDto,
  GetUserSummaryDto,
} from "@cedar2/interface";

// 定数
const { WALLET } = useConstant();
const commonSchema = useZodSchema();

// プロパティ
const props = defineProps<{
  groupId: number;
  paymentDate: string;
  userNoOfcreatedBy: number;
  users: GetUserSummaryDto[];
}>();

// カテゴリ取得
const { data: categoryTree } = await useFetch<GetCategoryTreeDto[]>(
  "categories",
  {
    baseURL: WALLET.BASE_URL,
  },
);
const categories = computed((): GetCategoryDto[] => {
  if (categoryTree.value === undefined) {
    return [];
  }
  return flattenCategoryTree(categoryTree.value);
});

// フォーム定義
const formSchema = z.object({
  title: z.string().nonempty("タイトルは必須です。"),
  note: z.string(),
  categoryId: z.number("カテゴリは必須です。"),
  amount: commonSchema.amount,
  allocations: z.array(
    z.object({
      userNo: z.number(),
      amount: commonSchema.amount,
    }),
  ),
  actuals: z.array(
    z.object({
      userNo: z.number(),
      amount: commonSchema.amount,
    }),
  ),
});
type FormSchema = z.output<typeof formSchema>;
const state = reactive<Partial<FormSchema>>({
  title: "",
  note: "",
  categoryId: undefined,
  amount: 0,
  allocations: props.users.map((u) => ({ userNo: u.no, amount: 0 })),
  actuals: props.users.map((u) => ({ userNo: u.no, amount: 0 })),
});

/**
 * 新規作成ボタン押下時の処理
 */
const onSubmit = async (event: FormSubmitEvent<FormSchema>) => {
  const createPaymentDto: CreatePaymentDto = {
    groupId: props.groupId,
    title: state.title!,
    note: state.note!,
    paymentDate: props.paymentDate,
    amount: state.amount!,
    isIncome: false,
    categoryId: state.categoryId!,
    userNoOfcreatedBy: props.userNoOfcreatedBy,
    allocations: state.allocations!,
    actuals: state.actuals!,
    // allocations: [
    //   { userNo: 1, amount: 100 },
    //   { userNo: 2, amount: 100 },
    // ],
    // actuals: [
    //   { userNo: 1, amount: 200 },
    //   { userNo: 2, amount: 0 },
    // ],
  };

  await useFetch(WALLET.RESOURCE.PAYMENTS, {
    baseURL: WALLET.BASE_URL,
    method: "POST",
    body: createPaymentDto,
  });

  // const toast = useToast()
  // toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data);
};
</script>

<template>
  <UForm
    :schema="formSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="タイトル" name="title" required>
      <UInput
        v-model="state.title"
        placeholder="タイトルを入力"
        class="w-full"
      />
    </UFormField>

    <UFormField label="メモ" name="note">
      <UTextarea v-model="state.note" placeholder="メモを入力" class="w-full" />
    </UFormField>

    <UFormField label="カテゴリ" name="categoryId" required>
      <USelectMenu
        v-model="state.categoryId"
        value-key="id"
        label-key="name"
        :items="categories"
        class="w-full"
      />
    </UFormField>

    <UFormField label="金額" name="amount" required>
      <UInputNumber v-model="state.amount" class="w-full" />
    </UFormField>

    <UFormField label="支払った額" name="foo" required>
      <UInputNumber v-model="state.amount" class="w-full" />
      <UInputNumber v-model="state.amount" class="w-full" />
    </UFormField>

    <UButton type="submit"> 新規作成 </UButton>
  </UForm>
</template>

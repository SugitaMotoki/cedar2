<script setup lang="ts">
import { z } from "zod";
import type {
  CreatePaymentDto,
  GetCategoryDto,
  GetCategoryTreeDto,
  GetPaymentSummaryDto,
  GetUserSummaryDto,
} from "@cedar2/interface";

// 定数
const { API } = useConstant();
const commonSchema = useZodSchema();
const { today, convertYearToYyyy, convertMonthToMm, convertDayToDd } =
  useDate();

// プロパティ
const props = defineProps<{
  groupId: number;
  paymentDate?: {
    yyyy: string;
    mm: string;
    dd: string;
  };
  createdBy: string;
  users: GetUserSummaryDto[];
}>();

// カテゴリ取得
const getCategoriesUrl = `${API.WALLET.CATEGORIES}`;
const { data: categoryTree } = await useFetch<GetCategoryTreeDto[]>(
  getCategoriesUrl,
  {
    $fetch: useNuxtApp().$walletFetch,
  },
);
const categories = computed((): GetCategoryDto[] => {
  if (categoryTree.value === undefined) {
    return [];
  }
  return flattenCategoryTree(categoryTree.value);
});

// フォーム定義
const paymentSchema = z.object({
  paymentDate: z.object({
    yyyy: commonSchema.yyyy.min(1, "年は必須です。"),
    mm: commonSchema.mm.min(1, "月は必須です。"),
    dd: commonSchema.dd.min(1, "日は必須です。"),
  }),
  title: z.string().min(1, "タイトルは必須です。"),
  note: z.string(),
  categoryId: z.number("カテゴリは必須です。"),
  amount: commonSchema.amount,
});
const detailSchema = z.object({
  user: z.custom<GetUserSummaryDto>(),
  allocation: commonSchema.amount,
  actual: commonSchema.amount,
});
type PaymentSchema = z.output<typeof paymentSchema>;
type DetailSchema = z.output<typeof detailSchema>;
type FormSchema = PaymentSchema & {
  details: Partial<DetailSchema>[];
};

const state = reactive<Partial<FormSchema>>({
  paymentDate: props.paymentDate
    ? {
        ...props.paymentDate,
      }
    : {
        yyyy: convertYearToYyyy(today.year),
        mm: convertMonthToMm(today.month),
        dd: convertDayToDd(today.day),
      },
  title: "",
  note: "",
  categoryId: undefined,
  amount: 0,
  details: props.users.map((user) => ({ user, allocation: 0, actual: 0 })),
});

const allocationTotal = computed(() =>
  state.details?.reduce((sum, detail) => sum + detail.allocation!, 0),
);
const actualTotal = computed(() =>
  state.details?.reduce((sum, detail) => sum + detail.actual!, 0),
);
const amountErrorMessage = ref<string | null>(null);
const isButtonActive = ref<boolean>(true);

/**
 * 金額を各ユーザに等しく割り当てる関数
 */
const allocateAmount = () => {
  const n = state.details!.length;
  if (n > 0) {
    state.details!.forEach((d, i) => {
      d.allocation =
        Math.floor(state.amount! / n) + (i < state.amount! % n ? 1 : 0);
    });
  }
};

/**
 * 新規作成ボタン押下時の処理
 */
const onSubmit = async () => {
  // エラーチェック
  if (state.amount !== allocationTotal.value) {
    amountErrorMessage.value =
      "支払うべき金額の割り当てが合計金額と一致しません。";
    return;
  } else if (state.amount !== actualTotal.value) {
    amountErrorMessage.value =
      "支払った金額の割り当てが合計金額と一致しません。";
    return;
  }
  amountErrorMessage.value = null;

  const { yyyy, mm, dd } = state.paymentDate!;
  const createPaymentDto: CreatePaymentDto = {
    groupId: props.groupId,
    title: state.title!,
    note: state.note!,
    paymentDate: `${yyyy}-${mm}-${dd}`, // TODO
    amount: state.amount!,
    isIncome: false,
    categoryId: state.categoryId!,
    createdBy: props.createdBy,
    allocations: state.details!.map((detail) => ({
      userId: detail.user!.id,
      amount: detail.allocation!,
    })),
    actuals: state.details!.map((detail) => ({
      userId: detail.user!.id,
      amount: detail.actual!,
    })),
  };

  try {
    isButtonActive.value = false;
    const result = await useNuxtApp().$walletFetch<GetPaymentSummaryDto>(
      API.WALLET.PAYMENTS,
      {
        method: "POST",
        body: createPaymentDto,
      },
    );
    navigateTo(`${result.id}`);
  } catch {
    amountErrorMessage.value = "エラーが発生しました。";
    isButtonActive.value = true;
  }
};
</script>

<template>
  <!-- 支払いフォーム -->
  <UForm
    :schema="paymentSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <!-- 日付 -->
    <div class="columns-3">
      <UFormField label="年" name="year" required>
        <UInput
          v-model="state.paymentDate!.yyyy"
          placeholder="年を入力"
          class="w-full"
        />
      </UFormField>
      <UFormField label="月" name="month" required>
        <UInput
          v-model="state.paymentDate!.mm"
          placeholder="月を入力"
          class="w-full"
        />
      </UFormField>
      <UFormField label="日" name="day" required>
        <UInput
          v-model="state.paymentDate!.dd"
          placeholder="日を入力"
          class="w-full"
        />
      </UFormField>
    </div>

    <!-- タイトル -->
    <UFormField label="タイトル" name="title" required>
      <UInput
        v-model="state.title"
        placeholder="タイトルを入力"
        class="w-full"
      />
    </UFormField>

    <!-- メモ -->
    <UFormField label="メモ" name="note">
      <UTextarea v-model="state.note" placeholder="メモを入力" class="w-full" />
    </UFormField>

    <!-- カテゴリ -->
    <UFormField label="カテゴリ" name="categoryId" required>
      <USelectMenu
        v-model="state.categoryId"
        value-key="id"
        label-key="name"
        :items="categories"
        class="w-full"
      />
    </UFormField>

    <!-- 金額 -->
    <UFormField label="金額" name="amount" required>
      <UInput
        v-model="state.amount"
        type="number"
        class="w-full"
        style="text-align: right"
        @change="
          () => {
            if (String(state.amount) === '') {
              state.amount = 0;
            }
          }
        "
      >
        <template #trailing> 円 </template>
      </UInput>
    </UFormField>

    <div class="flex justify-end gap-2">
      <UButton
        icon="i-lucide-chevron-up"
        color="secondary"
        variant="soft"
        @click="
          () => {
            state.amount = allocationTotal;
          }
        "
      >
        再計算
      </UButton>
      <UButton
        icon="i-lucide-chevron-down"
        color="secondary"
        variant="soft"
        @click="allocateAmount"
      >
        割り勘
      </UButton>
    </div>

    <!-- 明細フォーム -->
    <UForm
      v-for="(detail, count) in state.details"
      :key="count"
      :schema="detailSchema"
      :name="`details.${count}`"
      nested
    >
      <!-- ユーザごと -->
      <div class="flex flex-row gap-2 items-end">
        <!-- ユーザ情報 -->
        <div class="flex-1">
          <UUser
            :name="detail.user?.profile.displayName"
            :avatar="{
              src: detail.user?.profile.avatarUrl,
              loading: 'lazy',
              icon: 'i-lucide-image',
            }"
          />
        </div>

        <!-- 支払うべき -->
        <div class="basis-1/4">
          <UFormField
            :label="!count ? '支払うべき' : undefined"
            name="allocation"
            required
          >
            <UInput
              v-model="detail.allocation"
              type="number"
              class="w-full"
              style="text-align: right"
              @change="
                () => {
                  if (String(detail.allocation) === '') {
                    detail.allocation = 0;
                  }
                }
              "
            >
              <template #trailing> 円 </template>
            </UInput>
          </UFormField>
        </div>

        <!-- 支払った -->
        <div class="basis-1/4">
          <UFormField
            :label="!count ? '支払った' : undefined"
            name="actual"
            required
          >
            <UInput
              v-model="detail.actual"
              type="number"
              class="w-full"
              style="text-align: right"
              @change="
                () => {
                  if (String(detail.actual) === '') {
                    detail.actual = 0;
                  }
                }
              "
            >
              <template #trailing> 円 </template>
            </UInput>
          </UFormField>
        </div>

        <!-- 全額支払いボタン -->
        <div>
          <UButton
            icon="i-lucide-wallet"
            color="secondary"
            size="md"
            variant="soft"
            @click="
              () => {
                state.details!.forEach((d) => {
                  d.actual = 0;
                });
                detail.actual = allocationTotal;
              }
            "
          />
        </div>
      </div>
    </UForm>

    <!-- 集計行 -->
    <div class="flex flex-row gap-2">
      <div class="flex-1">合計</div>
      <div class="basis-1/3 text-right basis-1/4">{{ allocationTotal }} 円</div>
      <div class="basis-1/3 text-right basis-1/4">{{ actualTotal }} 円</div>
      <UButton icon="i-lucide-wallet" size="md" class="invisible" />
    </div>

    <!-- エラーメッセージ -->
    <UAlert
      v-if="amountErrorMessage !== null"
      :description="amountErrorMessage"
      color="error"
      variant="outline"
    />

    <!-- 新規作成ボタン -->
    <UButton type="submit" class="flex justify-self-end" variant="soft">
      新規作成
    </UButton>
  </UForm>
</template>

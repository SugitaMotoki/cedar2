<!-- 支払い / [支払いID] -->

<script setup lang="ts">
import type { GetPaymentDetailDto, GetUserSummaryDto } from "@cedar2/interface";

const { API } = useConstant();
const route = useRoute();

const groupId = route.params["groupId"];
const paymentId = route.params["paymentId"];
const url = `${API.WALLET.PAYMENTS}/${paymentId}`;

const { data: payment, error } = await useFetch<GetPaymentDetailDto>(url, {
  $fetch: useNuxtApp().$walletFetch,
  query: { groupId },
});

if (error.value) {
  showError({
    statusCode: error.value.statusCode,
    statusMessage: "お探しのページは見つかりませんでした。",
    message: "URLが間違っている可能性があります。",
  });
}

// 金額フォーマッター
const formatCurrency = (num: number) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(num);
};

/**
 * ユーザーごとの収支計算
 * 差額 = 実際に支払った額 - 負担すべき額
 */
const balanceSheet = computed(() => {
  if (!payment.value) return [];

  const userMap = new Map<
    string,
    {
      user: GetUserSummaryDto;
      allocated: number;
      actual: number;
    }
  >();

  // 負担すべき額 (Allocation) を加算
  payment.value.allocations.forEach((a) => {
    const data = userMap.get(a.user.id) || {
      user: a.user,
      allocated: 0,
      actual: 0,
    };
    data.allocated += a.amount;
    userMap.set(a.user.id, data);
  });

  // 実際に支払った額 (Actuals) を加算
  payment.value.actuals.forEach((a) => {
    const data = userMap.get(a.user.id) || {
      user: a.user,
      allocated: 0,
      actual: 0,
    };
    data.actual += a.amount;
    userMap.set(a.user.id, data);
  });

  return Array.from(userMap.values()).map((item) => ({
    ...item,
    diff: item.actual - item.allocated,
  }));
});
</script>

<template>
  <UPage>
    <div v-if="payment">
      <UPageHeader
        :title="payment.title"
        :description="payment.paymentDate.replaceAll('-', '/')"
        headline="支払い詳細"
      >
        <template #links>
          <UBadge
            :label="payment.category.name"
            color="secondary"
            variant="soft"
          />
          <UBadge
            :label="payment.isSettled ? '精算済み' : '未精算'"
            :color="payment.isSettled ? 'secondary' : 'primary'"
          />
        </template>
      </UPageHeader>

      <UPageBody class="space-y-6">
        <UCard>
          <div class="flex flex-col items-center justify-center py-4">
            <span class="text-sm text-gray-500">合計金額</span>
            <span class="text-4xl font-black text-gray-900 dark:text-white">
              {{ formatCurrency(payment.amount) }}
            </span>
          </div>
        </UCard>

        <section class="space-y-3">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 px-1">
            収支内訳
          </h3>
          <UCard>
            <ul class="divide-y divide-gray-200 dark:divide-gray-800">
              <li
                v-for="item in balanceSheet"
                :key="item.user.id"
                class="p-4 flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="item.user.profile.avatarUrl"
                    :alt="item.user.profile.displayName"
                    size="sm"
                  />
                  <span class="text-sm font-medium">{{
                    item.user.profile.displayName
                  }}</span>
                </div>
                <div class="text-right">
                  <div
                    class="text-sm font-bold"
                    :class="item.diff >= 0 ? 'text-primary' : 'text-red-500'"
                  >
                    {{ item.diff > 0 ? "+" : ""
                    }}{{ formatCurrency(item.diff) }}
                  </div>
                  <div class="text-[10px] text-gray-500">
                    支払: {{ formatCurrency(item.actual) }} / 負担:
                    {{ formatCurrency(item.allocated) }}
                  </div>
                </div>
              </li>
            </ul>
          </UCard>
        </section>

        <section v-if="payment.settlements.length > 0" class="space-y-3">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 px-1">
            精算済み記録
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <UAlert
              v-for="s in payment.settlements"
              :key="s.id"
              icon="i-heroicons-check-circle"
              color="secondary"
              variant="subtle"
              :title="`精算額: ${formatCurrency(s.amount)}`"
            />
          </div>
        </section>

        <section v-if="payment.note" class="space-y-2">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 px-1">
            メモ
          </h3>
          <div
            class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap"
          >
            {{ payment.note }}
          </div>
        </section>

        <div class="flex justify-end items-center gap-2 text-xs text-gray-500">
          <span>作成者:</span>
          <UAvatar :src="payment.createdBy.profile.avatarUrl" size="3xs" />
          <span>{{ payment.createdBy.profile.displayName }}</span>
        </div>
      </UPageBody>
    </div>

    <div v-else>
      <UEmpty
        title="支払い情報が見つかりませんでした"
        icon="i-heroicons-magnifying-glass"
      />
    </div>
  </UPage>
</template>

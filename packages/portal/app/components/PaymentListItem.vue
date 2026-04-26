<script setup lang="ts">
import type { GetPaymentSummaryDto } from "@cedar2/interface";
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  payment: GetPaymentSummaryDto;
  to?: RouteLocationRaw;
}>();

// 金額のフォーマット（1,000円形式）
const formattedAmount = computed(() => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(props.payment.amount);
});
</script>

<template>
  <ULink
    :to="props.to"
    class="flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 last:border-0"
  >
    <div class="flex flex-col gap-0.5">
      <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
        {{ payment.paymentDate.replaceAll("-", "/") }}
      </span>
      <span class="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
        {{ payment.title }}
      </span>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex flex-col items-end gap-1">
        <span class="text-base font-bold text-gray-900 dark:text-white">
          {{ formattedAmount }}
        </span>
        <UBadge
          v-if="payment.isSettled"
          label="精算済"
          size="xs"
          variant="soft"
          color="secondary"
        />
        <UBadge
          v-else
          label="未精算"
          size="xs"
          variant="soft"
          color="primary"
        />
      </div>
      <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 text-gray-400" />
    </div>
  </ULink>
</template>
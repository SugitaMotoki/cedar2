<script setup lang="ts">
import { computed } from "vue";
import type { GetPaymentSummaryDto } from "#shared/dto/payment";
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  payment: GetPaymentSummaryDto;
  to?: RouteLocationRaw;
}>();

const title = computed(() => {
  const dateStr = props.payment.paymentDate.toString().replaceAll("-", "/");
  return `${dateStr} ${props.payment.title}`;
});

const description = computed(() => `¥${props.payment.amount}`);
</script>

<template>
  <UPageCard
    :to="props.to"
    :title="title"
    :description="description"
    variant="ghost"
    orientation="horizontal"
  />
</template>

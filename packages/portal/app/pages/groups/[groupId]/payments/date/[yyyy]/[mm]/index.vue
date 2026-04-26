<!-- 支払い / [yyyy] / [mm] -->

<script setup lang="ts">
import type { GetPaymentSummaryDto } from "@cedar2/interface";
import { z } from "zod";

// 定数
const { API } = useConstant();

// クエリパラメータ
const commonSchema = useZodSchema();
const paramSchema = z.object({
  groupId: commonSchema.groupId,
  yyyy: commonSchema.yyyy,
  mm: commonSchema.mm,
});
const { params } = useRoute();
const { data, success, error } = paramSchema.safeParse(params);
if (!success) {
  throw createError({
    status: 400,
    message: error.message,
  });
}

// クエリパラメータ取得
const groupId = ref(data.groupId);
const yyyy = ref(data.yyyy);
const mm = ref(data.mm);

// 支払い一覧を取得
const url = `${API.WALLET.PAYMENTS}`;
const { data: payments } = await useFetch<GetPaymentSummaryDto[]>(url, {
  $fetch: useNuxtApp().$walletFetch,
  query: {
    yyyymm: `${yyyy.value}-${mm.value}`,
    groupId,
  },
});
</script>

<template>
  <UPage>
    <UPageHeader :title="`${yyyy}/${mm}`" headline="支払い" />

    <UPageBody>
      <UPageList divide>
        <PaymentListItem
          v-for="(payment, index) in payments"
          :key="index"
          :to="{
            name: 'groups-groupId-payments-paymentId',
            params: {
              groupId,
              paymentId: payment.id,
            },
          }"
          :payment="payment"
        />
      </UPageList>
    </UPageBody>
  </UPage>
</template>

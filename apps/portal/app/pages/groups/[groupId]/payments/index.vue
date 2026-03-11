<script setup lang="ts">
import type { GetPaymentSummaryDto } from "@cedar2/interface";

const { API } = useConstant();
const route = useRoute();

const groupId = route.params["groupId"];
const url = `${API.WALLET.PAYMENTS}`;
const { data: payments, error } = await useFetch<GetPaymentSummaryDto[]>(url, {
  $fetch: useNuxtApp().$walletFetch,
  query: {
    groupId,
  },
});
if (error.value) {
  showError({
    statusCode: error.value.statusCode,
    statusMessage: "お探しのページは見つかりませんでした。",
    message: "URLが間違っている可能性があります。",
  });
}
</script>

<template>
  <UPage>
    <UPageHeader title="一覧" headline="支払い" />

    <UPageBody>
      <UPageList divide>
        <UPageCard
          v-for="(payment, index) in payments"
          :key="index"
          :to="`payments/${payment.id}`"
          variant="ghost"
        >
          <template #body>
            <h2>{{ payment.id }}</h2>
            <h2>{{ payment.title }}</h2>
            <h2>{{ payment.amount }}円</h2>
            <h2>{{ payment.note }}</h2>
            <h2>{{ payment.createdAt }}</h2>
            <h2>{{ payment.paymentDate }}</h2>
          </template>
        </UPageCard>
      </UPageList>
    </UPageBody>
  </UPage>
</template>

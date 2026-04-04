<!-- 支払い / [支払いID] -->

<script setup lang="ts">
import type { GetPaymentDetailDto } from "@cedar2/interface";

const { API } = useConstant();
const route = useRoute();

// const groupId = route.params["groupId"];
const paymentId = route.params["paymentId"];
const url = `${API.WALLET.PAYMENTS}/${paymentId}`;
const { data: payment, error } = await useFetch<GetPaymentDetailDto>(url, {
  $fetch: useNuxtApp().$walletFetch,
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
    <div v-if="payment">
      <UPageHeader :title="payment.title" headline="支払い" />

      <UPageBody>
        {{ payment.amount }}
        {{ payment.note }}
        {{ payment.isSettled }}
      </UPageBody>
    </div>
    <div v-else>
      <UEmpty title="Not found" />
    </div>
  </UPage>
</template>

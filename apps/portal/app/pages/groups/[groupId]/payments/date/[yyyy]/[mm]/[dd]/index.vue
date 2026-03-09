<script setup lang="ts">
import type { GetPaymentSummaryDto } from "@cedar2/interface";
import { z } from "zod";

// クエリパラメータ定義
const schema = useZodSchema();
const paramSchema = z.object({
  groupId: schema.groupId,
  yyyy: schema.yyyy,
  mm: schema.mm,
  dd: schema.dd,
});

// クエリパラメータ検証
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
const dd = ref(data.dd);

// 支払い一覧を取得
const { API } = useConstant();
const { data: payments } = await useFetch<GetPaymentSummaryDto[]>(
  API.WALLET.PAYMENTS,
  { baseURL: API.WALLET.BASE_URL },
);
</script>

<template>
  <UPage>
    <UPageHeader :title="`${yyyy}/${mm}/${dd}`" headline="支払い" />

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

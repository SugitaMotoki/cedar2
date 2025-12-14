<script setup lang="ts">
import type { GetPaymentSummaryDto } from "#shared/dto/payment";
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
const { WALLET } = useConstant();
const { data: payments } = await useFetch<GetPaymentSummaryDto[]>(
  WALLET.RESOURCE.PAYMENTS,
  { baseURL: WALLET.BASE_URL },
);
</script>

<template>
  <UPage>
    <UPageHeader :title="`${yyyy}/${mm}/${dd}`" headline="支払い" />

    <UPageBody>
      <UModal
        title="支払い新規作成"
        description="支払いの情報を入力してください。"
        :dismissible="false"
        :ui="{ footer: 'justify-end' }"
      >
        <UButton label="新規作成" color="neutral" variant="subtle" />

        <template #body>
          <Placeholder class="h-48 m-4" />
        </template>
        <template #footer>
          <UButton label="Submit" color="neutral" />
        </template>
      </UModal>

      <UPageList divide>
        <PaymentCard
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

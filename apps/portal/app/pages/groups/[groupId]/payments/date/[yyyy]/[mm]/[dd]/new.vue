<script setup lang="ts">
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
const yyyy = ref(data.yyyy);
const mm = ref(data.mm);
const dd = ref(data.dd);
</script>

<template>
  <UPage>
    <UPageHeader :title="`${yyyy}/${mm}/${dd}`" headline="支払い" />

    <UPageBody>
      <UContainer>
        <PaymentForm
          :group-id="1"
          :payment-date="'2026-01-01'"
          :created-by="'taro'"
          :users="[
            {
              id: 'user01',
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 'user02',
              createdAt: '',
              updatedAt: '',
            },
          ]"
        />
      </UContainer>
    </UPageBody>
  </UPage>
</template>

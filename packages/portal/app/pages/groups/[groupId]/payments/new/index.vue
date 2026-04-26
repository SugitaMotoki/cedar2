<!-- 支払い / 新規作成 -->

<script setup lang="ts">
import { z } from "zod";
import type { GetGroupDto } from "@cedar2/interface";

const { API } = useConstant();
const { params, query } = useRoute();
const schema = useZodSchema();
const { dto: user } = useUserStore();

// パスパラメータ検証
const paramSchema = z.object({
  groupId: schema.groupId,
});
const { data: validatedParams } = paramSchema.safeParse(params);
if (validatedParams === undefined) {
  throw showError("aa");
}

// クエリパラメータ検証
const querySchema = z.object({
  yyyy: schema.yyyy.optional(),
  mm: schema.mm.optional(),
  dd: schema.dd.optional(),
});
const { data: validatedQuery } = querySchema.safeParse(query);
if (validatedQuery === undefined) {
  throw showError("aa");
}

// 日付の指定があれば設定
const { yyyy, mm, dd } = validatedQuery;
const paymentDate =
  yyyy && mm && dd
    ? {
        yyyy,
        mm,
        dd,
      }
    : undefined;

// サーバからグループを取得
const getGroupUrl = `${API.WALLET.GROUPS}/${validatedParams.groupId}`;
const { data: group, error: getGroupError } = await useFetch<GetGroupDto>(
  getGroupUrl,
  {
    $fetch: useNuxtApp().$walletFetch,
  },
);
if (group === undefined) {
  throw showError({
    statusCode: getGroupError!.value!.statusCode,
    statusMessage: "お探しのページは見つかりませんでした。",
    message: "URLが間違っている可能性があります。",
  });
}
</script>

<template>
  <UPage>
    <UPageHeader title="新規作成" headline="支払い" />

    <UPageBody v-if="group" class="p-4">
      <PaymentForm
        :group-id="group.id"
        :created-by="user.id"
        :payment-date="paymentDate"
        :users="group.members.map((gm) => gm.member)"
      />
    </UPageBody>
  </UPage>
</template>

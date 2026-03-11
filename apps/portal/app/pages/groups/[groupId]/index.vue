<script setup lang="ts">
import type { GetGroupDto } from "@cedar2/interface";

const { API } = useConstant();
const route = useRoute();

const groupId = route.params["groupId"];
const url = `${API.WALLET.GROUPS}/${groupId}`;
const { data: group, error } = await useFetch<GetGroupDto>(url, {
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
    <UPageHeader :title="group?.name" headline="グループ" />

    <UPageBody>
      <UPageCard
        title="支払い一覧"
        :to="`${route.fullPath}/payments`"
        class="rounded-none"
      />
      <UPageCard
        title="支払いカレンダー"
        :to="`${route.fullPath}/payments/date`"
        class="rounded-none"
      />
    </UPageBody>
  </UPage>
</template>

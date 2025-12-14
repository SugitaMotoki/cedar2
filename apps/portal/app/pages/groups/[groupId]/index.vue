<script setup lang="ts">
const route = useRoute();
const groupId = route.params["groupId"];
const title = `グループ#${groupId}`;
</script>

<template>
  <UPage>
    <UPageHeader :title="title" headline="グループ" />

    <UPageBody>
      <UButton :to="`${route.fullPath}/payments`"> 支払い一覧 </UButton>
      <UButton :to="`${route.fullPath}/payments/date`">
        支払いカレンダー
      </UButton>
    </UPageBody>
  </UPage>
</template>

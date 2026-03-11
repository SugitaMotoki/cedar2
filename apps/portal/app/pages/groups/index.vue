<script setup lang="ts">
import type { GetGroupDto } from "@cedar2/interface";

const { API } = useConstant();
const { dto: user } = useUserStore();
const { data: groups } = await useFetch<GetGroupDto[]>(
  `${API.WALLET.GROUPS}/own`,
  {
    $fetch: useNuxtApp().$walletFetch,
  },
);
</script>

<template>
  <UPage>
    <UPageHeader title="あなたのグループ" headline="グループ" />

    <UPageList divide>
      <UPageCard
        v-for="(group, index) in groups"
        :key="index"
        :to="`groups/${group.id}`"
        variant="ghost"
      >
        <template #body>
          <h2>{{ group.id }}</h2>
          <h2>{{ group.name }}</h2>
          <h2 v-if="group.createdBy.id === user.id">あなたが作成者です。</h2>
        </template>
      </UPageCard>
    </UPageList>
    <UPageBody />
  </UPage>
</template>

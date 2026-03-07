<script setup lang="ts">
// import type {
//   GetUserSummaryDto,
// } from "@cedar2/interface";

// const { user } = defineProps<{
//   user: GetUserSummaryDto;
// }>();

const { dto: user, fetch } = useUserStore();
await callOnce(fetch);
</script>

<template>
  <UUser
    :name="user.id"
    :description="user.createdAt"
    :avatar="{
      src: 'https://i.pravatar.cc/150?u=john-doe',
    }"
    :chip="{
      color: 'primary',
      position: 'top-right',
    }"
  />
</template>

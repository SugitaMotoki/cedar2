<script setup lang="ts">
type SizeType =
  | "md"
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
const { dto: user } = useUserStore();
const size = ref<SizeType>("3xl");
</script>

<template>
  <UUser
    :name="user.profile.displayName"
    :description="user.profile.bio"
    :avatar="{
      src: user.profile.avatarUrl,
    }"
    orientation="vertical"
    :size="size"
  />
</template>

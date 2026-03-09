<script setup lang="ts">
const { dto: user } = useUserStore();
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

<script setup lang="ts">
const route = useRoute();
const yyyy = route.params["yyyy"];
</script>

<template>
  <UPage>
    <UPageHeader :title="`${yyyy}年`" headline="支払い" />

    <UPageBody />
  </UPage>
</template>

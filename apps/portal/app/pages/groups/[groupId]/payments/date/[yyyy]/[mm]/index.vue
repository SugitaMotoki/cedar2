<script setup lang="ts">
const route = useRoute();
const yyyy = route.params["yyyy"];
const mm = route.params["mm"];
</script>

<template>
  <UPage>
    <UPageHeader :title="`${yyyy}/${mm}`" headline="支払い" />

    <UPageBody />
  </UPage>
</template>

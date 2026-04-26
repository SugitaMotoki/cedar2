<script setup lang="ts">
const onClick = async () => {
  const { API } = useConstant();
  const { $walletFetch } = useNuxtApp();
  const result = await $walletFetch<PortalLogoutResult>(
    API.WALLET.AUTH.LOGOUT,
    {
      method: "POST",
    },
  );
  if (result.isSuccessed) {
    navigateTo("/login");
  }
};
</script>

<template>
  <UPage>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
      <UPageCard title="ログアウトしますか" class="w-full max-w-md">
        <UButton loading-auto @click="onClick"> ログアウト </UButton>
      </UPageCard>
    </div>
  </UPage>
</template>

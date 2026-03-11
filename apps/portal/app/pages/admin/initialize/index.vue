<script setup lang="ts">
const { API } = useConstant();
const { $walletFetch } = useNuxtApp();

const onClick = async () => {
  await $walletFetch<string>(`${API.WALLET.USERS}`, {
    method: "POST",
    body: {
      id: "hanako",
      password: "hanako",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.USERS}`, {
    method: "POST",
    body: {
      id: "ken",
      password: "ken",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.USERS}/taro`, {
    method: "PATCH",
    body: {
      displayName: "太郎",
      birthday: "2000-01-01",
      bio: "こんにちは",
      avatarUrl:
        "https://zukan.pokemon.co.jp/zukan-api/up/images/index/5bb0cfd44302cd4df0c0c88d37457931.png",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.USERS}/hanako`, {
    method: "PATCH",
    body: {
      displayName: "花子",
      birthday: "2000-01-01",
      bio: "ごきげんよう",
      avatarUrl:
        "https://zukan.pokemon.co.jp/zukan-api/up/images/index/326507f5595907c72d74ac8ea686a6ce.png",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.USERS}/ken`, {
    method: "PATCH",
    body: {
      displayName: "健",
      birthday: "2000-01-01",
      bio: "Hello",
      avatarUrl:
        "https://zukan.pokemon.co.jp/zukan-api/up/images/index/6e2add6b5fbbe1a16d3cb31344cd8dc1.png",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.GROUPS}`, {
    method: "POST",
    body: {
      name: "神奈川県民",
      createdBy: "taro",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.GROUPS}/1/members`, {
    method: "POST",
    body: {
      userId: "hanako",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.GROUPS}`, {
    method: "POST",
    body: {
      name: "ゴルフ部",
      createdBy: "taro",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch<string>(`${API.WALLET.GROUPS}/2/members`, {
    method: "POST",
    body: {
      userId: "hanako",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  navigateTo("/");
};
</script>

<template>
  <UPage>
    <UPageHeader title="初期化" headline="管理者ページ" />

    <UPageBody>
      <UButton @click="onClick">初期化ボタン</UButton>
    </UPageBody>
  </UPage>
</template>

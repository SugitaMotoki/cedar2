<script setup lang="ts">
const { API } = useConstant();
const { $walletFetch } = useNuxtApp();

const onClick = async () => {
  await $walletFetch(`${API.WALLET.USERS}`, {
    method: "POST",
    body: {
      id: "hanako",
      password: "hanako",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.USERS}`, {
    method: "POST",
    body: {
      id: "ken",
      password: "ken",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.USERS}/taro`, {
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
  await $walletFetch(`${API.WALLET.USERS}/hanako`, {
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
  await $walletFetch(`${API.WALLET.USERS}/ken`, {
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
  await $walletFetch(`${API.WALLET.GROUPS}`, {
    method: "POST",
    body: {
      name: "神奈川県民",
      createdBy: "taro",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.GROUPS}/1/members`, {
    method: "POST",
    body: {
      userId: "hanako",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.GROUPS}`, {
    method: "POST",
    body: {
      name: "ゴルフ部",
      createdBy: "taro",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.GROUPS}/2/members`, {
    method: "POST",
    body: {
      userId: "hanako",
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.CATEGORIES}`, {
    method: "POST",
    body: {
      name: "食費",
      parentId: null,
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.CATEGORIES}`, {
    method: "POST",
    body: {
      name: "食材",
      parentId: 1,
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.CATEGORIES}`, {
    method: "POST",
    body: {
      name: "外食",
      parentId: 1,
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.PAYMENTS}`, {
    method: "POST",
    body: {
      groupId: 1,
      title: "東急ストア",
      note: "夜ご飯など",
      paymentDate: "2025-12-01",
      amount: 2000,
      isIncome: false,
      categoryId: 2,
      createdBy: "taro",
      allocations: [
        { userId: "taro", amount: 1000 },
        { userId: "hanako", amount: 1000 },
      ],
      actuals: [
        { userId: "taro", amount: 2000 },
        { userId: "hanako", amount: 0 },
      ],
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.PAYMENTS}`, {
    method: "POST",
    body: {
      groupId: 1,
      title: "東急ストア",
      note: "昼ごはんなど",
      paymentDate: "2025-12-02",
      amount: 4000,
      isIncome: false,
      categoryId: 2,
      createdBy: "taro",
      allocations: [
        { userId: "taro", amount: 2000 },
        { userId: "hanako", amount: 2000 },
      ],
      actuals: [
        { userId: "taro", amount: 0 },
        { userId: "hanako", amount: 4000 },
      ],
    },
    onResponse: ({ request, response }) => {
      console.log(`${request}: ${response.ok}`);
    },
  });
  await $walletFetch(`${API.WALLET.PAYMENTS}`, {
    method: "POST",
    body: {
      groupId: 1,
      title: "イオン",
      note: "色々",
      paymentDate: "2025-12-03",
      amount: 3000,
      isIncome: false,
      categoryId: 2,
      createdBy: "taro",
      allocations: [
        { userId: "taro", amount: 1500 },
        { userId: "hanako", amount: 1500 },
      ],
      actuals: [
        { userId: "taro", amount: 3000 },
        { userId: "hanako", amount: 0 },
      ],
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

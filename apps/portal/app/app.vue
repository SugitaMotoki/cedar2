<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ja } from "@nuxt/ui/locale";

// ヘッダ
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "ja",
  },
});

// メタデータ
const title = "杉の木";
const description = "杉の木ポータルサイト";
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterCard: "summary_large_image",
});

// ナビゲーションメニュー
const route = useRoute();
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "会計",
    icon: "i-tabler-pig-money",
    to: "/login",
    active: route.path.startsWith("/login"),
  },
]);
const isLoginPage = computed(() => route.path.startsWith("/login"));

// const userStore = useUserStore();
// if (!isLoginPage.value) {
//   await userStore.fetch()
//   // await callOnce(userStore.fetch);
// }
</script>

<template>
  <UApp :locale="ja">
    <UHeader mode="modal">
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>

        <TemplateMenu />
      </template>

      <UNavigationMenu v-if="!isLoginPage" :items="items" />

      <template #right>
        <UColorModeButton />
      </template>

      <template #body>
        <div v-if="!isLoginPage">
          <UserInfo />
          <USeparator icon="i-simple-icons-nuxtdotjs" />
          <UNavigationMenu
            :items="items"
            orientation="vertical"
            class="-mx-2.5"
          />
        </div>
        <div v-else>ログインしてください</div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/SugitaMotoki/cedar2"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>

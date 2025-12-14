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
    to: "/docs/getting-started",
    active: route.path.startsWith("/docs/getting-started"),
  },
  // {
  //   label: '写真',
  //   to: '/docs/getting-started',
  //   active: route.path.startsWith('/docs/getting-started')
  // },
]);
</script>

<template>
  <UApp :locale="ja">
    <UHeader mode="slideover">
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>

        <TemplateMenu />
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
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
          to="https://github.com/nuxt-ui-templates/starter"
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

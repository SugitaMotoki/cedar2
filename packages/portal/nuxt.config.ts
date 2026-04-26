// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      WALLET: {
        SCHEME: process.env["WALLET_SHCEME"] || "http",
        FQDN: process.env["WALLET_FQDN"] || "localhost",
        PORT: process.env["WALLET_PORT"] || "4000",
      },
    },
  },

  routeRules: {
    "/": { prerender: true },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  compatibilityDate: "2025-01-15",

  nitro: {
    imports: {
      dirs: [
        "./app/composables", // composablesをサーバー側でもスキャン対象にする
        "./app/utils",
      ],
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});

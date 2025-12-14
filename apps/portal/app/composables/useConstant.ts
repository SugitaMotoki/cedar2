import type { RuntimeConfig } from "nuxt/schema";

/**
 * 定数を利用するためのコンポーザブル
 */
export const useConstant = () => {
  const config = useRuntimeConfig();

  return {
    /**
     * 会計API
     */
    WALLET: getWalletConfig(config),
  } as const;
};

/**
 * 会計APIに関するコンフィグを取得する関数
 */
const getWalletConfig = (config: RuntimeConfig) => {
  const { SCHEME, FQDN, PORT } = config.public.WALLET;
  return {
    /**
     * ベースURL
     */
    BASE_URL: `${SCHEME}://${FQDN}:${PORT}`,

    /**
     * リソース名
     */
    RESOURCE: {
      /**
       * 支払い
       */
      PAYMENTS: "payments",
    },
  };
};

import type { LoginRequest } from "@cedar2/interface";

/**
 * 認証を利用するためのコンポーザブル
 */
export const useAuth = () => {
  const { API } = useConstant();

  /**
   * ログイン用メソッド
   */
  const login = (loginRequest: LoginRequest): Promise<PortalLoginResult> => {
    return $fetch<PortalLoginResult>(API.PORTAL.LOGIN, {
      baseURL: API.PORTAL.BASE_URL,
      method: "POST",
      body: loginRequest,
    });
  };

  return {
    login,
  };
};

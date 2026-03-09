import type { LoginRequest, LoginResponse } from "@cedar2/interface";

/**
 * /api/login
 * ログイン処理を行うAPI
 */
export default defineEventHandler(async (event): Promise<PortalLoginResult> => {
  const { API, COOKIE } = useConstant();

  const body: LoginRequest = await readBody(event);

  try {
    const { accessToken, refreshToken } = await $fetch<LoginResponse>(
      API.WALLET.AUTH.LOGIN,
      {
        baseURL: API.WALLET.BASE_URL,
        method: "POST",
        body,
        onResponseError: ({ response }) => {
          throw new Error(response.statusText);
        },
      },
    );

    setCookie(event, COOKIE.ACCESS_TOKEN, accessToken, {
      maxAge: COOKIE.ACCESS_TOKEN_MAX_AGE,
      httpOnly: true,
      sameSite: "strict",
    });

    setCookie(event, COOKIE.REFRESH_TOKEN, refreshToken, {
      maxAge: COOKIE.REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
      sameSite: "strict",
    });

    return {
      isSuccessed: true,
    };
  } catch (error: unknown) {
    return {
      isSuccessed: false,
      error,
    };
  }
});

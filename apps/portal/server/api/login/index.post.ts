import type { LoginRequest, LoginResponse } from "@cedar2/interface";

export default defineEventHandler(async (event): Promise<PortalLoginResult> => {
  const { API, COOKIE } = useConstant();

  const body: LoginRequest = await readBody(event);

  try {
    const { accessToken } = await $fetch<LoginResponse>(API.WALLET.AUTH.LOGIN, {
      baseURL: API.WALLET.BASE_URL,
      method: "POST",
      body,
      onResponseError: ({ response }) => {
        throw new Error(response.statusText);
      },
    });
    setCookie(event, COOKIE.ACCESS_TOKEN, accessToken, {
      maxAge: COOKIE.MAX_AGE,
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

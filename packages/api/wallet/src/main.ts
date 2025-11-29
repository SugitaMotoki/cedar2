import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

/**
 * 環境変数を取得する関数
 * @param key 環境変数名
 * @returns 値
 */
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined || value == "") {
    throw new Error(`環境変数 "${key}" を取得できませんでした。`);
  }
  return value;
};

/**
 * アプリを起動する関数
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const HOST_NAME: string = getEnv("HOSTNAME");
  const PORT = {
    WALLET: getEnv("WALLET_PORT"),
    CEDAR_PORTAL: getEnv("CEDAR_PORTAL_PORT"),
  } as const;

  app.enableCors({
    origin: [
      `http://${HOST_NAME}:${PORT.CEDAR_PORTAL}`,
      `https://${HOST_NAME}:${PORT.CEDAR_PORTAL}`,
    ],
  });

  await app.listen(PORT.WALLET);
}

void bootstrap().then();

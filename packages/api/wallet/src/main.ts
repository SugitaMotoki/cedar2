import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ENV } from "./constants";
import { NotFoundExceptionFilter } from "./not-found-exception.filter";

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
  // アプリ作成
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 環境変数から情報を取得
  const HOST_NAME: string = getEnv(ENV.COMMON.HOSTNAME);
  const PORT = {
    WALLET: getEnv(ENV.WALLET.PORT),
    PORTAL: getEnv(ENV.PORTAL.PORT),
  } as const;

  // CORSの設定
  app.enableCors({
    origin: [
      `http://${HOST_NAME}:${PORT.PORTAL}`,
      `https://${HOST_NAME}:${PORT.PORTAL}`,
    ],
  });

  // フィルタ設定
  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(PORT.WALLET);
}

void bootstrap().then();

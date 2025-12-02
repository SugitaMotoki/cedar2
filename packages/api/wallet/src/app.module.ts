import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENV } from "./constants";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from "./categories/categories.module";
import { GroupsModule } from "./groups/groups.module";
import { PaymentsModule } from "./payments/payments.module";
import { SettlementsModule } from "./settlements/settlements.module";
import { PresetsModule } from "./presets/presets.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        ".env", // walletの.envファイル（優先）
        join("..", "..", "..", ".env"), // ルートの.envファイル
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env[ENV.COMMON.HOSTNAME],
      port: Number(process.env[ENV.DB.PORT]),
      username: process.env[ENV.DB.USER],
      password: process.env[ENV.DB.PASSWORD],
      database: process.env[ENV.DB.NAME],
      autoLoadEntities: true,
      synchronize: true, // TODO: 本番環境ではfalseにする
    }),
    UsersModule,
    CategoriesModule,
    GroupsModule,
    PaymentsModule,
    SettlementsModule,
    PresetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

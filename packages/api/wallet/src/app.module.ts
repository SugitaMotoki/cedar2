import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENV } from "./constants";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from "./categories/categories.module";
import { GroupsModule } from "./groups/groups.module";
import { PaymentsModule } from "./payments/payments.module";
import { SettlementsModule } from "./settlements/settlements.module";
import { PresetsModule } from "./presets/presets.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        ".env", // walletの.envファイル（優先）
        join("..", "..", "..", ".env"), // ルートの.envファイル
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get<string>(ENV.COMMON.HOSTNAME),
        port: config.get<number>(ENV.DB.PORT),
        username: config.get<string>(ENV.DB.USER),
        password: config.get<string>(ENV.DB.PASSWORD),
        database: config.get<string>(ENV.DB.NAME),
        autoLoadEntities: true,
        synchronize: true, // TODO: 本番環境ではfalseにする
      }),
    }),
    UsersModule,
    CategoriesModule,
    GroupsModule,
    PaymentsModule,
    SettlementsModule,
    PresetsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

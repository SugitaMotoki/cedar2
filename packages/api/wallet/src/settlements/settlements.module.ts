import { Module } from "@nestjs/common";
import { SettlementsService } from "./settlements.service";
import { SettlementsController } from "./settlements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Settlement } from "./entities/settlement.entity";
import { PaymentsModule } from "@/payments/payments.module";

@Module({
  imports: [TypeOrmModule.forFeature([Settlement]), PaymentsModule],
  controllers: [SettlementsController],
  providers: [SettlementsService],
  exports: [SettlementsService],
})
export class SettlementsModule {}

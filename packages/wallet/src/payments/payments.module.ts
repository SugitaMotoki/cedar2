import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentAllocation } from "./entities/payment-allocation.entity";
import { PaymentActual } from "./entities/payment-actual.entity";
import { GroupsModule } from "@/groups/groups.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentAllocation, PaymentActual]),
    GroupsModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}

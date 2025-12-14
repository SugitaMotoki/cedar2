import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import type { CreatePaymentDto } from "@cedar2/interface/payment/dto/create_payment";
import type { UpdatePaymentDto } from "@cedar2/interface/payment/dto/update_payment";
import type { CreateAllocationDto } from "@cedar2/interface/payment/dto/create_allocation";
import type { UpdateAllocationDto } from "@cedar2/interface/payment/dto/update_allocation";
import type { CreateActualDto } from "@cedar2/interface/payment/dto/create_actual";
import type { UpdateActualDto } from "@cedar2/interface/payment/dto/update_actual";

/**
 * 支払いに関するコントローラ
 */
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  findAllPayments() {
    return this.paymentsService.findAllPayments();
  }

  @Get(":paymentId")
  findPaymentByIdOrThrow(@Param("paymentId") paymentId: string) {
    return this.paymentsService.findPaymentByIdOrThrow(+paymentId);
  }

  @Patch(":paymentId")
  updatePayment(
    @Param("paymentId") paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.updatePayment(+paymentId, updatePaymentDto);
  }

  @Delete(":id")
  removePayment(@Param("id") id: string) {
    return this.paymentsService.removePayment(+id);
  }

  @Post(":paymentId/allocations")
  addAllocationToPayment(
    @Param("paymentId") paymentId: string,
    @Body() { userNo, amount }: CreateAllocationDto,
  ) {
    return this.paymentsService.addAllocationToPayment(
      +paymentId,
      userNo,
      amount,
    );
  }

  @Patch(":paymentId/allocations/:allocationId")
  updatePaymentAllocation(
    @Param("paymentId") _: string,
    @Param("allocationId") allocationId: string,
    @Body() { amount }: UpdateAllocationDto,
  ) {
    return this.paymentsService.updatePaymentAllocation(+allocationId, amount);
  }

  @Delete(":paymentId/allocations/:allocationId")
  removePaymentAllocation(
    @Param("paymentId") _: string,
    @Param("allocationId") allocationId: string,
  ) {
    return this.paymentsService.removePaymentAllocation(+allocationId);
  }

  @Post(":paymentId/actuals")
  addActualToPayment(
    @Param("paymentId") paymentId: string,
    @Body() { userNo, amount }: CreateActualDto,
  ) {
    return this.paymentsService.addActualToPayment(+paymentId, userNo, amount);
  }

  @Patch(":paymentId/actuals/:actualId")
  updatePaymentActual(
    @Param("paymentId") _: string,
    @Param("actualId") actualId: string,
    @Body() { amount }: UpdateActualDto,
  ) {
    return this.paymentsService.updatePaymentActual(+actualId, amount);
  }

  @Delete(":paymentId/actuals/:actualId")
  removePaymentActual(
    @Param("paymentId") _: string,
    @Param("actualId") actualId: string,
  ) {
    return this.paymentsService.removePaymentActual(+actualId);
  }
}

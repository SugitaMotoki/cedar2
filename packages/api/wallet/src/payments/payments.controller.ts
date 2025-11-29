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
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

/**
 * 支払いに関するコントローラ
 */
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAllPayments();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findPaymentByIdOrThrow(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.updatePayment(+id, updatePaymentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.removePayment(+id);
  }
}

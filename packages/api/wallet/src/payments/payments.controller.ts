import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import type {
  CreatePaymentDto,
  UpdatePaymentDto,
  CreateAllocationDto,
  UpdateAllocationDto,
  CreateActualDto,
  UpdateActualDto,
} from "@cedar2/interface";
import { CheckGroupMember } from "@/groups/decorators/check-group-member.decorator";

/**
 * 支払いに関するコントローラ
 */
@Controller("payments")
@CheckGroupMember()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  async findPayments(
    @Query("groupId") groupId?: number,
    @Query("yyyy") yearStr?: string,
    @Query("yyyymm") monthStr?: string,
    @Query("yyyymmdd") dateStr?: string,
  ) {
    if (groupId === undefined) {
      // グループIDがない場合は全取得
      // TODO: Admin以外たたけないようにする
      return this.paymentsService.findAllPayments();
    }

    // グループIDの指定がある場合
    if (dateStr !== undefined) {
      return this.paymentsService.findPaymentByPaymentDate(dateStr, groupId);
    } else if (monthStr !== undefined) {
      return this.paymentsService.findPaymentByPaymentMonth(monthStr, groupId);
    } else if (yearStr !== undefined) {
      return this.paymentsService.findPaymentByPaymentYear(yearStr, groupId);
    } else {
      return this.paymentsService.findPaymentsByGroupId(groupId);
    }
  }

  @Get(":paymentId")
  findPaymentByIdOrThrow(
    @Param("paymentId") paymentId: string,
    @Query("groupId") groupId?: number,
  ) {
    // グループIDを指定しない場合エラーとする
    if (groupId === undefined) {
      throw new BadRequestException();
    }
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
    @Body() { userId, amount }: CreateAllocationDto,
  ) {
    return this.paymentsService.addAllocationToPayment(
      +paymentId,
      userId,
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
    @Body() { userId, amount }: CreateActualDto,
  ) {
    return this.paymentsService.addActualToPayment(+paymentId, userId, amount);
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

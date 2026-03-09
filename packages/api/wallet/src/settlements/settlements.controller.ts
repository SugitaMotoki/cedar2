import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SettlementsService } from "./settlements.service";
import type {
  CreateSettlementDto,
  UpdateSettlementDto,
} from "@cedar2/interface";

/**
 * 精算に関するコントローラ
 */
@Controller("settlements")
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  @Post()
  createSettlement(@Body() createSettlementDto: CreateSettlementDto) {
    return this.settlementsService.createSettlement(createSettlementDto);
  }

  @Get()
  findAllSettlements() {
    return this.settlementsService.findAllSettlements();
  }

  @Get(":id")
  findSettlementByIdOrThrow(@Param("id") id: string) {
    return this.settlementsService.findSettlementByIdOrThrow(+id);
  }

  @Patch(":id")
  updateSettlement(
    @Param("id") id: string,
    @Body() updateSettlementDto: UpdateSettlementDto,
  ) {
    return this.settlementsService.updateSettlement(+id, updateSettlementDto);
  }

  @Delete(":id")
  removeSettlement(@Param("id") id: string) {
    return this.settlementsService.removeSettlement(+id);
  }
}

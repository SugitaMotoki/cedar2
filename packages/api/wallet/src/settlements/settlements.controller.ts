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
import { CreateSettlementDto } from "./dto/create-settlement.dto";
import { UpdateSettlementDto } from "./dto/update-settlement.dto";

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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PresetsService } from "./presets.service";
import { CreatePresetDto } from "./dto/create-preset.dto";
import { UpdatePresetDto } from "./dto/update-preset.dto";

@Controller("presets")
export class PresetsController {
  constructor(private readonly presetsService: PresetsService) {}

  @Post()
  createPreset(@Body() createPresetDto: CreatePresetDto) {
    return this.presetsService.createPreset(createPresetDto);
  }

  @Get()
  findAllPresets() {
    return this.presetsService.findAllPresets();
  }

  @Get(":id")
  findPresetByIdOrThrow(@Param("id") id: string) {
    return this.presetsService.findPresetByIdOrThrow(+id);
  }

  @Patch(":id")
  updatePreset(
    @Param("id") id: string,
    @Body() updatePresetDto: UpdatePresetDto,
  ) {
    return this.presetsService.updatePreset(+id, updatePresetDto);
  }

  @Delete(":id")
  removePreset(@Param("id") id: string) {
    return this.presetsService.removePreset(+id);
  }
}

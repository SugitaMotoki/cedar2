import { Module } from "@nestjs/common";
import { PresetsService } from "./presets.service";
import { PresetsController } from "./presets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Preset } from "./entities/preset.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Preset])],
  controllers: [PresetsController],
  providers: [PresetsService],
  exports: [PresetsService],
})
export class PresetsModule {}

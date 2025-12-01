import { Injectable } from "@nestjs/common";
import { CreateSettlementDto } from "./dto/create-settlement.dto";
import { UpdateSettlementDto } from "./dto/update-settlement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Settlement } from "./entities/settlement.entity";
import { Repository } from "typeorm";
import { User } from "@/users/entities/user.entity";
import { Payment } from "@/payments/entities/payment.entity";
import { PaymentsService } from "@/payments/payments.service";

/**
 * 精算に関するサービス
 */
@Injectable()
export class SettlementsService {
  /**
   * コンストラクタ
   * @param settlementsRepository
   */
  constructor(
    @InjectRepository(Settlement)
    private readonly settlementsRepository: Repository<Settlement>,
    private readonly paymentsService: PaymentsService,
  ) {}

  /**
   * 精算を作成するメソッド
   * @returns 作成した支払い
   */
  async createSettlement({
    from,
    to,
    amount,
    note,
    payments,
  }: CreateSettlementDto): Promise<Readonly<Settlement>> {
    const settlement = new Settlement({
      from: new User({ no: from }),
      to: new User({ no: to }),
      amount,
      note,
      payments: payments.map((id) => new Payment({ id })),
    });
    await this.settlementsRepository.save(settlement);
    await this.paymentsService.settlePayments(payments);
    return settlement;
  }

  /**
   * 全ての精算を取得するメソッド
   * @returns 全ての精算
   */
  findAllSettlements(): Promise<Readonly<Settlement[]>> {
    return this.settlementsRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定されたIDの精算を取得するメソッド
   * @param id
   * @returns 指定されたIDの精算（なければエラー）
   */
  findSettlementByIdOrThrow(id: number): Promise<Readonly<Settlement>> {
    return this.settlementsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        from: true,
        to: true,
        payments: true,
      },
    });
  }

  /**
   * 指定されたIDの精算を更新するメソッド
   * @param id
   * @param updateSettlementDto
   * @returns 更新結果
   */
  updateSettlement(
    id: number,
    { from, to, amount, note, payments }: UpdateSettlementDto,
  ) {
    const settlement = new Settlement({
      from: from !== undefined ? new User({ no: from }) : undefined,
      to: to !== undefined ? new User({ no: to }) : undefined,
      amount,
      note,
      payments: payments?.map((id) => new Payment({ id })),
    });
    return this.settlementsRepository.update(id, settlement);
  }

  /**
   * 指定されたIDの精算を削除するメソッド
   * @param id
   * @returns 削除結果
   */
  async removeSettlement(id: number) {
    return this.settlementsRepository.delete(id);
  }
}

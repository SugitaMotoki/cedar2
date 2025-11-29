import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { Group } from "@/groups/entities/group.entity";
import { Category } from "@/categories/entities/category.entity";
import { User } from "@/users/entities/user.entity";

/**
 * 支払いに関するサービス
 */
@Injectable()
export class PaymentsService {
  /**
   * コンストラクタ
   * @param paymentsRepository
   */
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  /**
   * 支払いを作成するメソッド
   * @returns 作成した支払い
   */
  async createPayment({
    groupId,
    title,
    note,
    paymentDate,
    amount,
    isIncome,
    categoryId,
    userNoOfcreatedBy,
  }: CreatePaymentDto): Promise<Readonly<Payment>> {
    const payment = new Payment({
      group: new Group({ id: groupId }),
      title,
      note,
      paymentDate,
      amount,
      isIncome,
      isSettled: false,
      orderKey: 0,
      category: new Category({ id: categoryId }),
      createdBy: new User({ no: userNoOfcreatedBy }),
    });
    await this.paymentsRepository.save(payment);
    return payment;
  }

  /**
   * 全ての支払いを取得するメソッド
   * @returns 全ての支払い
   */
  findAllPayments(): Promise<Readonly<Payment[]>> {
    return this.paymentsRepository.find({
      order: {
        orderKey: "ASC",
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定されたIDの支払いを取得するメソッド
   * @param id
   * @returns 指定されたIDの支払い（なければエラー）
   */
  findPaymentByIdOrThrow(id: number): Promise<Readonly<Payment>> {
    return this.paymentsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  /**
   * 指定されたIDの支払いを更新するメソッド
   * @param id
   * @param updatePaymentDto
   * @returns 更新結果
   */
  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = new Payment({ ...updatePaymentDto });
    const updateResult = await this.paymentsRepository.update(id, payment);
    return updateResult;
  }

  /**
   * 指定されたIDの支払いを削除するメソッド
   * @param id
   * @returns 削除結果
   */
  async removePayment(id: number) {
    const deleteResult = await this.paymentsRepository.delete(id);
    return deleteResult;
  }
}

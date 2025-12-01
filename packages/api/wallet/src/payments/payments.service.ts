import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { Group } from "@/groups/entities/group.entity";
import { Category } from "@/categories/entities/category.entity";
import { User } from "@/users/entities/user.entity";
import { PaymentAllocation } from "./entities/payment-allocation.entity";
import { PaymentActual } from "./entities/payment-actual.entity";

/**
 * 支払いに関するサービス
 */
@Injectable()
export class PaymentsService {
  /**
   * コンストラクタ
   * @param paymentsRepository
   * @param paymentAllocationsRepository
   * @param paymentActualsRepository
   */
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(PaymentAllocation)
    private readonly paymentAllocationsRepository: Repository<PaymentAllocation>,
    @InjectRepository(PaymentActual)
    private readonly paymentActualsRepository: Repository<PaymentActual>,
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
    allocations,
    actuals,
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

    // 支払い割り当て
    for (const { userNo, amount } of allocations) {
      await this.addAllocationToPayment(payment.id, userNo, amount);
    }
    // 実際の支払い
    for (const { userNo, amount } of actuals) {
      await this.addActualToPayment(payment.id, userNo, amount);
    }

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
      relations: {
        allocations: {
          user: true,
        },
        actuals: {
          user: true,
        },
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
   * 指定されたIDの支払い一覧を精算済みにするメソッド
   * @param paymentIdList
   */
  async settlePayments(paymentIdList: number[]) {
    await this.paymentsRepository.update(
      paymentIdList,
      new Payment({ isSettled: true }),
    );
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

  /**
   * 支払い割り当てを追加するメソッド
   * @param paymentId 支払いID
   * @param userNo ユーザの通し番号
   * @param amount 金額
   * @returns 追加した支払い割り当て
   */
  async addAllocationToPayment(
    paymentId: number,
    userNo: number,
    amount: number,
  ): Promise<Readonly<PaymentAllocation>> {
    const allocation = new PaymentAllocation({
      payment: new Payment({ id: paymentId }),
      user: new User({ no: userNo }),
      amount,
    });
    await this.paymentAllocationsRepository.save(allocation);
    return allocation;
  }

  /**
   * 支払い割り当ての金額を更新するメソッド
   * @param id
   * @param amount
   * @returns 更新結果
   */
  async updatePaymentAllocation(id: number, amount: number) {
    const allocation = new PaymentAllocation({ amount });
    const updateResult = await this.paymentAllocationsRepository.update(
      id,
      allocation,
    );
    return updateResult;
  }

  /**
   * 支払い割り当てを削除するメソッド
   * @param id
   * @returns 削除結果
   */
  async removePaymentAllocation(id: number) {
    const deleteResult = await this.paymentAllocationsRepository.delete(id);
    return deleteResult;
  }

  /**
   * 実際の支払いを追加するメソッド
   * @param paymentId 支払いID
   * @param userNo ユーザの通し番号
   * @param amount 金額
   * @returns 追加した実際の支払い
   */
  async addActualToPayment(
    paymentId: number,
    userNo: number,
    amount: number,
  ): Promise<Readonly<PaymentActual>> {
    const actual = new PaymentActual({
      payment: new Payment({ id: paymentId }),
      user: new User({ no: userNo }),
      amount,
    });
    await this.paymentActualsRepository.save(actual);
    return actual;
  }

  /**
   * 実際の支払いの金額を更新するメソッド
   * @param id
   * @param amount
   * @returns 更新結果
   */
  async updatePaymentActual(id: number, amount: number) {
    const actual = new PaymentActual({ amount });
    const updateResult = await this.paymentActualsRepository.update(id, actual);
    return updateResult;
  }

  /**
   * 実際の支払いを削除するメソッド
   * @param id
   * @returns 削除結果
   */
  async removePaymentActual(id: number) {
    const deleteResult = await this.paymentActualsRepository.delete(id);
    return deleteResult;
  }
}

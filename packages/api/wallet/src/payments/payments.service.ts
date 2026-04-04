import { Injectable } from "@nestjs/common";
import type { CreatePaymentDto, UpdatePaymentDto } from "@cedar2/interface";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Between, EntityManager, Repository, DataSource } from "typeorm";
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
   * @param dataSource
   */
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(PaymentAllocation)
    private readonly paymentAllocationsRepository: Repository<PaymentAllocation>,
    @InjectRepository(PaymentActual)
    private readonly paymentActualsRepository: Repository<PaymentActual>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
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
    createdBy,
    allocations,
    actuals,
  }: CreatePaymentDto): Promise<Readonly<Payment>> {
    return this.dataSource.transaction(async (manager: EntityManager) => {
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
        createdBy: new User({ id: createdBy }),
      });

      // 支払いを保存
      const newPayment = manager.save(payment);

      // 支払い割り当て
      for (const { userId, amount } of allocations) {
        const allocation = new PaymentAllocation({
          payment: new Payment({ id: payment.id }),
          user: new User({ id: userId }),
          amount,
        });
        await manager.save(allocation);
      }

      // 実際の支払い
      for (const { userId, amount } of actuals) {
        const actual = new PaymentActual({
          payment: new Payment({ id: payment.id }),
          user: new User({ id: userId }),
          amount,
        });
        await manager.save(actual);
      }

      return newPayment;
    });
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
   * 指定されたグループの支払いを取得するメソッド
   */
  findPaymentsByGroupId(groupId: number): Promise<Readonly<Payment[]>> {
    return this.paymentsRepository.find({
      where: {
        group: {
          id: groupId,
        },
      },
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
   * 指定された**日**の支払いを取得するメソッド
   * @param dateStr 支払い日の文字列 2026-01-01
   */
  findPaymentByPaymentDate(
    dateStr: string,
    groupId: number,
  ): Promise<Readonly<Payment[]>> {
    return this.paymentsRepository.find({
      where: {
        paymentDate: dateStr,
        group: {
          id: groupId,
        },
      },
      order: {
        orderKey: "ASC",
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定された**月**の支払いを取得するメソッド
   * @param monthStr 支払い月の文字列 2026-01
   */
  findPaymentByPaymentMonth(
    monthStr: string,
    groupId: number,
  ): Promise<Readonly<Payment[]>> {
    const [year, month] = monthStr.split("-").map(Number);
    const lastDay = new Date(year, month, 0).getDate();
    const startDate = `${monthStr}-01`;
    const endDate = `${monthStr}-${String(lastDay).padStart(2, "0")}`;

    return this.paymentsRepository.find({
      where: {
        paymentDate: Between(startDate, endDate),
        group: {
          id: groupId,
        },
      },
      order: {
        orderKey: "ASC",
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定された**年**の支払いを取得するメソッド
   * @param yearStr 支払い年の文字列 2026
   */
  findPaymentByPaymentYear(
    yearStr: string,
    groupId: number,
  ): Promise<Readonly<Payment[]>> {
    const startDate = `${yearStr}-01-01`;
    const endDate = `${yearStr}-12-31`;

    return this.paymentsRepository.find({
      where: {
        paymentDate: Between(startDate, endDate),
        group: {
          id: groupId,
        },
      },
      order: {
        orderKey: "ASC",
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定されたIDの支払いを更新するメソッド
   * @param id
   * @param updatePaymentDto
   * @returns 更新結果
   */
  updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = new Payment({ ...updatePaymentDto });
    return this.paymentsRepository.update(id, payment);
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
  removePayment(id: number) {
    return this.paymentsRepository.delete(id);
  }

  /**
   * 支払い割り当てを追加するメソッド
   * @param paymentId 支払いID
   * @param userId ユーザID
   * @param amount 金額
   * @returns 追加した支払い割り当て
   */
  async addAllocationToPayment(
    paymentId: number,
    userId: string,
    amount: number,
  ): Promise<Readonly<PaymentAllocation>> {
    const allocation = new PaymentAllocation({
      payment: new Payment({ id: paymentId }),
      user: new User({ id: userId }),
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
  updatePaymentAllocation(id: number, amount: number) {
    const allocation = new PaymentAllocation({ amount });
    return this.paymentAllocationsRepository.update(id, allocation);
  }

  /**
   * 支払い割り当てを削除するメソッド
   * @param id
   * @returns 削除結果
   */
  removePaymentAllocation(id: number) {
    return this.paymentAllocationsRepository.delete(id);
  }

  /**
   * 実際の支払いを追加するメソッド
   * @param paymentId 支払いID
   * @param userId ユーザID
   * @param amount 金額
   * @returns 追加した実際の支払い
   */
  async addActualToPayment(
    paymentId: number,
    userId: string,
    amount: number,
  ): Promise<Readonly<PaymentActual>> {
    const actual = new PaymentActual({
      payment: new Payment({ id: paymentId }),
      user: new User({ id: userId }),
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
  updatePaymentActual(id: number, amount: number) {
    const actual = new PaymentActual({ amount });
    return this.paymentActualsRepository.update(id, actual);
  }

  /**
   * 実際の支払いを削除するメソッド
   * @param id
   * @returns 削除結果
   */
  removePaymentActual(id: number) {
    return this.paymentActualsRepository.delete(id);
  }
}

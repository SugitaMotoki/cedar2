import { z } from "zod";
import { CalendarDate } from "@internationalized/date";

/**
 * Zodスキーマを利用するためのコンポーザブル
 */
export const useZodSchema = () => {
  return {
    /**
     * グループID
     */
    groupId: z.string().min(1),

    /**
     * 支払いID
     */
    paymentId: z.string().min(1),

    /**
     * ユーザID
     */
    userId: z.string().min(1, "ユーザIDは必須です。"),

    /**
     * パスワード
     */
    password: z.string().min(1, "パスワードは必須です。"),

    /**
     * 年
     */
    yyyy: z.string().regex(/^\d{4}$/),

    /**
     * 月
     */
    mm: z.string().regex(/^\d{2}$/),

    /**
     * 日
     */
    dd: z.string().regex(/^\d{2}$/),

    /**
     * 金額
     */
    amount: z
      .number("金額は必須です。")
      .nonnegative("マイナスは入力できません。"),

    /**
     * 日付
     */
    calendarDate: z.instanceof(CalendarDate, {
      message: "日付を選択してください。",
    }),
  };
};

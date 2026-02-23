import { z } from "zod";

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
     * ユーザの通し番号
     */
    userNo: z.number().min(1),

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
  };
};

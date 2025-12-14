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
     * グループID
     */
    paymentId: z.string().min(1),

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
  };
};

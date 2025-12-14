import type { GetUserSummaryDto } from "../user/summary"

/**
 * 支払い要約取得用DTO
 */
export interface GetPaymentSummaryDto {
  id: number
  title: string
  note: string
  paymentDate: string 
  amount: number
  isIncome: boolean
  isSettled: boolean
  orderKey: number
  createdAt: string
  updatedAt: string
}

/**
 * 支払い詳細取得用DTO
 */
export interface GetPaymentDetailDto {
  id: number
  title: string
  note: string
  paymentDate: string 
  amount: number
  isIncome: boolean
  isSettled: boolean
  orderKey: number
  createdAt: string
  updatedAt: string
  allocation: GetPaymentAllocationDto[]
  actuals: GetPaymentActualDto[]
}

/**
 * 支払い割り当て取得用DTO
 */
interface GetPaymentAllocationDto {
  id: number,
  user: GetUserSummaryDto,
  amount: number
  createdAt: string
  updatedAt: string
}

/**
 * 実際の支払い取得用DTO
 */
interface GetPaymentActualDto {
  id: number,
  user: GetUserSummaryDto,
  amount: number
  createdAt: string
  updatedAt: string
}

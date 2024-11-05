import { BACKEND_SERVER_URL } from './constants'

export const registerDevice = async () => {

}

export const invalidateDevice = async () => {

}

export const triggerMassNotifications = async () => {

}

export type Op = 'add' | 'sub' | 'mul' | 'div'

export interface CalculateRequest {
  op: Op
  x: number | null
  y: number | null
}

export interface CalculateResponse {
  acknowledged: boolean
}

export const calculate = async ({ x, y }: CalculateRequest): Promise<CalculateResponse> => {
  // todo
}
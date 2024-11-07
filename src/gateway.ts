import axios from 'axios'
import { BACKEND_SERVER_URL } from './constants'

const send = async (url: string, req: any): Promise<any> => {
  return await axios.post(url, JSON.stringify(req), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).catch((err: any) => {
      if (err.response && err.response.data && 'error' in err.response.data) {
        alert(err.response.data.error)
      } else {
        alert(err.response.data)
      }
  })
}

export const registerDevice = async (req: any) => {
  const registerDeviceUrl = `${BACKEND_SERVER_URL}/register-device`
  return await send(registerDeviceUrl, req)
}

// useful for testing
export const unregisterDevice = async (req: any) => {
  const unregisterDeviceUrl = `${BACKEND_SERVER_URL}/unregister-device`
  return await send(unregisterDeviceUrl, req)
}

export const notifyAllDevices = async () => {
  const notifyAllDevicesUrl = `${BACKEND_SERVER_URL}/notify-all-devices`
  return await send(notifyAllDevicesUrl, {})
}

export type Op = 'add' | 'sub' | 'mul' | 'div'

export interface CalculateRequest {
  op: Op
  x: number
  y: number
  deviceId: string | null
}

export const calculate = async (req: CalculateRequest): Promise<void> => {
  const calculateUrl = `${BACKEND_SERVER_URL}/calculate`
  return await send(calculateUrl, req)
}
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

export interface RegistrationState {
  registered: boolean
  expoPushToken: string | null
}

const initialState: RegistrationState = {
  registered: false,
  expoPushToken: null
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setRegistrationState: (state, action: PayloadAction<RegistrationState>) => {
      const { registered, expoPushToken } = action.payload
      state.registered = registered
      state.expoPushToken = expoPushToken
    },
    setExpoPushToken: (state, action: PayloadAction<string>) => {
      state.expoPushToken = action.payload
    }
  }
})

export const isRegistered = (state: AppState) => state.registration.registered
export const getExpoPushToken = (state: AppState) => state.registration.expoPushToken

export const { setRegistrationState, setExpoPushToken } = registrationSlice.actions
export default registrationSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

export interface RegistrationState {
  expoPushToken: string | null
}

const initialState: RegistrationState = {
  expoPushToken: null
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setExpoPushToken: (state, action: PayloadAction<string>) => {
      state.expoPushToken = action.payload
    },
    unsetExpoPushToken: (state) => {
      state.expoPushToken = null
    }
  }
})

export const isRegistered = (state: AppState) => state.registration.expoPushToken !== null
export const getExpoPushToken = (state: AppState) => state.registration.expoPushToken

export const { setExpoPushToken, unsetExpoPushToken } = registrationSlice.actions
export default registrationSlice.reducer
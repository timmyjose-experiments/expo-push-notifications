import { configureStore } from '@reduxjs/toolkit'
import registrationReducer from './registrationSlice'

export const store = configureStore({
  reducer: {
    registration: registrationReducer
  }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    resetUser: (state) => {
      state.user = null
    },
    restoreApp: (state, action) => {
      state = action.payload
    }
  },
})

export const appActions = appSlice.actions

export const appReducer = appSlice.reducer
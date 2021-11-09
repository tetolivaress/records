import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  records: {
    
  }
});

const store = configureStore({
  reducer: {
    hideLoading: (state) => {
      state.loading = false
    },
    showLoading: (state) => {
      state.loading = true
    },
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
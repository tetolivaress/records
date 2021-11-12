import { createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,  
  reducers: {
    hideLoading: (state) => {
      state.loading = false
    },
    showLoading: (state) => {
      state.loading = true
    },
  }
});

export default loadingSlice.reducer
export const { hideLoading, showLoading } = loadingSlice.actions;
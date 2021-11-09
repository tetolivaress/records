import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {

  },
})

export type StoreDispatch = typeof store.dispatch;
// Export typed dispatch hook
export const useStoreDispatch = () => useDispatch<StoreDispatch>();

// Export types selector hook
export const useStoreSelector = <TSelected = unknown>(selector: (state: RootState) => TSelected) =>
  useSelector(selector);
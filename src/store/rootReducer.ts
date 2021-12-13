import { combineReducers } from '@reduxjs/toolkit';

import loading from './slices/loadingSlice'
import records from './slices/recordsSlice'
import people from './slices/MoviesSlice'

const rootReducer = combineReducers ({
  loading,
  records,
  people,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
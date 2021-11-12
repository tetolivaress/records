import { combineReducers } from '@reduxjs/toolkit';

import loading from './reducers/loadingReducer'
import records from './reducers/recordsReducer'

const rootReducer = combineReducers ({
  loading,
  records
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
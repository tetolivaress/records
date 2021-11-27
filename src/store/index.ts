import { useDispatch, useSelector } from 'react-redux';
import Logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase'
import { constants as rfConstants } from 'redux-firestore'

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rfConstants.actionTypes).map(
            (type) => `${rfConstants.actionsPrefix}/${type}`
          ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
        ],
        ignoredPaths: ['firebase', 'firestore'],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }).concat(Logger),
})

export type StoreDispatch = typeof store.dispatch;
// Export typed dispatch hook
export const useStoreDispatch = () => useDispatch<StoreDispatch>();

// Export types selector hook
export const useStoreSelector = <TSelected = unknown>(selector: (state: RootState) => TSelected) =>
  useSelector(selector);

export default store;
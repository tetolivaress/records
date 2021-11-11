import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'

import loading from './reducers/loadingReducer'

const rootReducer = combineReducers ({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  loading
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
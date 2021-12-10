
import { createFirestoreInstance } from 'redux-firestore'
import {
  REACT_APP_APIKEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_DATABASEURL,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID,
  REACT_APP_MEASUREMENTID,
} from "@env"
import RNFirebase from 'react-native-firebase'
import 'firebase/auth'
import 'firebase/storage'


const fbConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  databaseURL: REACT_APP_DATABASEURL,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
  measurementId: REACT_APP_MEASUREMENTID
}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = store => ({
  firebase: RNFirebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
})

export {
  fbConfig,
  rrfProps
}
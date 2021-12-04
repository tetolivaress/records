import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from 'firebase'

import { DrawerNavigator } from './src/navigator/DrawerNavigator'
import store from './src/store'
import { fbConfig, rrfProps }  from './src/FirebaseConfig'

firebase.apps.length || firebase.initializeApp(fbConfig)

const App = () =>  (
    <Provider store={store}>    
      <ReactReduxFirebaseProvider {...rrfProps(store)}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </ReactReduxFirebaseProvider>
    </Provider>
)

export default App

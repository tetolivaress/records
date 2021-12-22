import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MoviesScreen from '../screens/MoviesScreen'
import DetailScreen from '../screens/DetailScreen';

const MoviesStack = createNativeStackNavigator()

const MoviesStackNavigator = () => {
  return (
    <MoviesStack.Navigator screenOptions={{headerShown: false}}>
      <MoviesStack.Screen name="MoviesScreen" component={MoviesScreen} />
      <MoviesStack.Screen name="MovieDetails" component={DetailScreen} />
    </MoviesStack.Navigator>
  )
}

export default MoviesStackNavigator
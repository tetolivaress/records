import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import HashTagsScreen from '../../screens/HashTagsScreen';


export type RootStackParams = {
  HomeScreen: undefined,
  HashTagsScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HashTagsScreen" options={{ title:"hashes" }} component={ HashTagsScreen } />
      <Stack.Screen name="HomeScreen" options={{ title:"My Screen" }} component={ HomeScreen } />
    </Stack.Navigator>
  )
}
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateRecordScreen from '../screens/CreateRecordScreen';


export type RootStackParams = {
  HomeScreen: undefined,
  CreateRecordScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="HomeScreen" options={{ title:"My Screen" }} component={ HomeScreen } />
      <Stack.Screen name="CreateRecordScreen" options={{ title:"records" }} component={ CreateRecordScreen } />
    </Stack.Navigator>
  )
}
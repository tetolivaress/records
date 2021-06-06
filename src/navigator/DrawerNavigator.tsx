import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { StackNavigator } from './StackNavigator';
import HashTagsScreen from '../screens/HashTagsScreen';
import RecordsScreen from '../screens/RecordsScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={ width >= 768 ? 'permanent' : 'front' }
    >
      <Drawer.Screen name="StackNavigator" component={StackNavigator} />
      <Drawer.Screen name="HashTagsScreen" component={HashTagsScreen} />
      <Drawer.Screen name="RecordsScreen" component={RecordsScreen} />
    </Drawer.Navigator>
  )
}
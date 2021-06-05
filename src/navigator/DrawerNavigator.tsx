import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import HashTagsScreen from '../screens/HashTagsScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={ width >= 768 ? 'permanent' : 'front' }
    >
      <Drawer.Screen name="Hashtags" component={HashTagsScreen} />
    </Drawer.Navigator>
  )
}
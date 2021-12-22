import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { StackNavigator } from './StackNavigator';
import CreateRecordScreen from '../screens/CreateRecordScreen';
import RecordsScreen from '../screens/RecordsScreen';
import MoviesScreen from '../screens/MoviesScreen';
import DetailScreen from '../screens/DetailScreen';
import { Movie } from '../interfaces/movie';
import AndroidTabs from '../navigator/Tabs/AndroidTabs';

export type RootStackParams = {
  Tabs: undefined;
  MoviesScreen: undefined;
  DetailScreen: Movie;
  StackNavigator: undefined;
  CreateRecordScreen: undefined;
  RecordsScreen: undefined;
}

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={ width >= 1024 ? 'permanent' : 'front' }
    >
      <Drawer.Screen name='Tabs' component={AndroidTabs}  options={{title: 'Peliculas'}}/>
      <Drawer.Screen name="MoviesScreen" component={MoviesScreen} />
      <Drawer.Screen name="DetailScreen" component={DetailScreen} />
      <Drawer.Screen name="CreateRecordScreen" component={CreateRecordScreen} />
      <Drawer.Screen name="RecordsScreen" component={RecordsScreen} />
    </Drawer.Navigator>
  )
}
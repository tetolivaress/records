import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RecordsScreen from '../../screens/RecordsScreen'
import MoviesScreen from '../../screens/MoviesScreen'

const Tabs = createBottomTabNavigator();

const AndroidTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="MoviesScreen" component={MoviesScreen} options={{title: 'Peliculas'}} />  
      <Tabs.Screen name="RecordsScreen" component={RecordsScreen} options={{title: 'Ocurrencias'}}  />
    </Tabs.Navigator>
  )
}

export default AndroidTabs

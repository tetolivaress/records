import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RecordsScreen from '../../screens/RecordsScreen'
import MicIcon from 'react-native-bootstrap-icons/icons/mic'
import VideoIcon from 'react-native-bootstrap-icons/icons/camera-video'
import MoviesStackNavigator from '../MoviesStackNavigator';

const Tabs = createBottomTabNavigator();

const AndroidTabs = () => {

  const selectIcon = (route:any)=>({
    tabBarIcon: () => {
      switch( route.name ) {
        case 'MoviesScreen':
          return <VideoIcon width="18" height="18" viewBox="0 0 16 16" fill="rgb(199, 0, 0)" />

        case 'RecordsScreen':
          return <MicIcon width="18" height="18" viewBox="0 0 16 16" fill="rgb(199, 0, 0)" />
      }
    }
  })

  return (
    <Tabs.Navigator
      screenOptions={ ({ route }) => selectIcon(route) }
    >
      <Tabs.Screen
        name="MoviesScreen"
        component={MoviesStackNavigator}
        options={{title: 'Peliculas'}}
      />
      <Tabs.Screen
        name="RecordsScreen"
        component={RecordsScreen}
        options={{title: 'Ocurrencias'}}
      />
    </Tabs.Navigator>
  )
}

export default AndroidTabs

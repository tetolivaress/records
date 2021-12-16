import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useAppSelector } from '../../hooks/hooks';
import store from '../../store/index';

interface Props {
  children:  JSX.Element | JSX.Element[];
}

const GradientBackground = ({ children }: Props) => {

  const { primary, secondary } = useAppSelector(state => state.movies.movieColors)

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[primary, secondary, 'white']}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1}}
        end={{ x: 0.5, y: 0.7}}
      />
      {children}
    </View>
  )
}

export default GradientBackground

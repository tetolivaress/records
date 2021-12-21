import React, { useEffect, useState } from "react";
import { StyleSheet, View, Animated } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { useStoreSelector } from '../../store';
import useFade from "../../hooks/useFade";

interface Props {
  children:  JSX.Element | JSX.Element[];
}

const GradientBackground = ({ children }: Props) => {

  const [background, setBackgroud] = useState({
    primary: 'transparent',
    secondary: 'transparent'
  })
  const movieColors = useStoreSelector(state => state.movies.movieColors)
  const { opacity, fadeIn, fadeOut } = useFade()

  useEffect(() => {
    fadeOut()
    fadeIn(() => setBackgroud({...movieColors}))
  }, [movieColors])

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[background.primary, background.secondary, 'white']}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1}}
        end={{ x: 0.5, y: 0.7}}
      />
      <Animated.View style={{...StyleSheet.absoluteFillObject, opacity}}>
        <LinearGradient
          colors={[movieColors.primary, movieColors.secondary, 'white']}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0.1, y: 0.1}}
          end={{ x: 0.5, y: 0.7}}
        />
      </Animated.View>
      {children}
    </View>
  )
}

export default GradientBackground

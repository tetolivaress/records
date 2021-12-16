import React, { useRef } from "react";
import { Animated } from "react-native";

const useFade = () => {
  const opacity = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(
      opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
      }
    ).start()
  }
  
  const fadeOut = () => {
    Animated.timing(
      opacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true
      }
    ).start()
  }

  return {
    opacity,
    fadeIn,
    fadeOut
  }
}

export default useFade
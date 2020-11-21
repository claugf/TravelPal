import React from "react";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";

const Dot = (currentIndex) => {
  //  Saving opacity for pagination
  const opacity = interpolate(currentIndex, {
    inputRange: [0, 1],
    outputRange: [0.4, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  //  Saving scale for pagination
  const scale = interpolate(currentIndex, {
    inputRange: [0, 1],
    outputRange: [1, 1.25],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: "#2CB9B0",
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4,
        transform: [{ scale }],
      }}
    />
  );
};

export default Dot;

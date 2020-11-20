import React, { useRef } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
//  Libraries for menus and animations
import Animated, {
  divide,
  Extrapolate,
  interpolate,
  multiply,
} from "react-native-reanimated";
import { interpolateColor, useScrollHandler } from "react-native-redash";
//  Libraries for geolocation
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

function TravelPalApp() {
  //  Saving varibles for manage scroll
  const scroll = useRef(null);
  const { scrollHandler, x } = useScrollHandler();
  //  Saving background color of the screens
  const backgroundColor = interpolateColor(x, {
    inputRange: [0, width, width * 2, width * 3],
    outputRange: ["#BFEAF5", "#FFE4D9", "#BEECC4", "#FFDDDD"],
  });
  //  Saving opacity for pagination
  const opacity = interpolate(x, {
    inputRange: [0, width, width * 2, width * 3],
    outputRange: [1, 0.2, 0.2, 0.2],
    extrapolate: Extrapolate.CLAMP,
  });

  //  Displaying the content
  return (
    // Begining Main Container
    <View style={styles.mainContainer}>
      {/* Begining Slider */}
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...scrollHandler}
        >
          {/* Begining Location Slide */}
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}>LOCATION </Text>
          </View>
          {/* End Location Slide */}
          {/* Begining Weather Slide */}
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}> WEATHER </Text>
          </View>
          {/* End Location Slide */}
          {/* Begining Currency Slide */}
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}>CURRENCY</Text>
          </View>
          {/* End Currency Slide */}
          {/* Begining Data Slide */}
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}>DATA</Text>
          </View>
          {/* End Data Slide */}
        </Animated.ScrollView>
      </Animated.View>
      {/* End Slider */}
      {/* Begining Footer */}
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        {/* Begining Footer Content */}
        <View style={styles.footerContent}>
          {/* Begining Pagination */}
          <View style={styles.pagination}>
            <Animated.View style={[styles.dot, { opacity }]} />
            <Animated.View style={[styles.dot, { opacity }]} />
            <Animated.View style={[styles.dot, { opacity }]} />
            <Animated.View style={[styles.dot, { opacity }]} />
          </View>
          {/* End Pagination */}
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {/* Begining Location SubSlide */}
            <View style={styles.subSlideContainer}>
              <Text>LOCATION</Text>
            </View>
            {/* End Location SubSlide */}
            {/* Begining Weather SubSlide */}
            <View style={styles.subSlideContainer}>
              <Text>WEATHER</Text>
            </View>
            {/* End Weather SubSlide */}
            {/* Begining Currency SubSlide */}
            <View style={styles.subSlideContainer}>
              <Text>CURRENCY</Text>
            </View>
            {/* End Currency SubSlide */}
            {/* Begining Data SubSlide */}
            <View style={styles.subSlideContainer}>
              <Text>DATA</Text>
            </View>
            {/* End Data SubSlide */}
          </Animated.View>
        </View>
        {/* End Footer Content */}
      </View>
      {/* End Footer */}
    </View>
    // End Main Container
  );
}

export default TravelPalApp;

// Saving some general parameters
const BORDER_RADIUS = 70;
const { width, height } = Dimensions.get("window");

//  Creating Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: 0.8 * height,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  slideContainer: {
    width,
  },
  slideTitle: {
    fontSize: 80,
    color: "white",
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    width: width * 4, //  Width * number of slides
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  subSlideContainer: {
    flex: 1,
    borderTopLeftRadius: BORDER_RADIUS,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pagination: {
    ...StyleSheet.absoluteFill,
    height: 45,
    width,
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    // opacity,
    backgroundColor: "#2CB9B0",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
    // transform: [{ scale: 1 }],
  },
  currentDot: {
    opacity: 1,
    backgroundColor: "#2CB9B0",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
    transform: [{ scale: 1.25 }],
  },
});

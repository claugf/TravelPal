import React, { useRef } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import Animated, { multiply } from "react-native-reanimated";
import { interpolateColor, useScrollHandler } from "react-native-redash";

const BORDER_RADIUS = 70;
const { width, height } = Dimensions.get("window");
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
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    width: width * 4, //  Width * number of slides
    // backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  subSlideContainer: {
    flex: 1,
    borderTopLeftRadius: BORDER_RADIUS,
    backgroundColor: "white",
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
    opacity: 0.5,
    backgroundColor: "#2CB9B0",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
    transform: [{ scale: 1 }],
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
//  de neuvoooo
const TravelPalApp = () => {
  const scroll = useRef(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: [0, width, width * 2, width * 3],
    outputRange: ["#BFEAF5", "#FFE4D9", "#BEECC4", "#FFDDDD"],
  });

  //  Displaying the content
  return (
    <View style={styles.mainContainer}>
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
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}>LOCAATION </Text>
          </View>
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}> WEATHER </Text>
          </View>
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}>CURRENCY</Text>
          </View>
          <View style={styles.slideContainer}>
            <Text style={styles.slideTitle}>DATA</Text>
          </View>
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            { transform: [{ translateX: multiply(x, -1) }], backgroundColor },
          ]}
        >
          <View style={styles.subSlideContainer}>
            <View style={styles.pagination}>
              <Animated.View style={styles.currentDot} />
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.dot} />
            </View>
            <Text>LOCATION</Text>
          </View>
          <View style={styles.subSlideContainer}>
            <View style={styles.pagination}>
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.currentDot} />
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.dot} />
            </View>
            <Text>WEATHER</Text>
          </View>
          <View style={styles.subSlideContainer}>
            <View style={styles.pagination}>
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.currentDot} />
              <Animated.View style={styles.dot} />
            </View>
            <Text>CURRENCY</Text>
          </View>
          <View style={styles.subSlideContainer}>
            <View style={styles.pagination}>
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.dot} />
              <Animated.View style={styles.currentDot} />
            </View>
            <Text>DATA</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default TravelPalApp;

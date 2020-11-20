import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { width },
  title: {
    fontSize: 80,
  },
});

const Slide = (label, right) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba </Text>
    </View>
  );
};

export default Slide;

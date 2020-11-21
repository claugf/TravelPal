import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

function Location(geoData, geoData2) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Welcome to</Text>
      <Text style={styles.heading1}>
        {geoData ? `${geoData.city} - ${geoData.country}` : ""}
      </Text>
      <Text style={styles.flag}>
        {geoData2 ? `${geoData2.countryFlag}` : ""}
      </Text>
      <Text style={styles.heading1}>
        {geoData.error ? `${geoData.error}` : ""}
      </Text>
    </View>
  );
}

export default Location;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  heading1: {
    // color: "#fff",
    fontWeight: "bold",
    fontSize: 50,
    margin: 20,
    textTransform: "uppercase",
  },
  heading2: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  flag: {
    fontSize: 100,
  },
});

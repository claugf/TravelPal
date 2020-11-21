import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    textAlignVertical: "center",
  },
  tempPrincipal: {
    color: "#fff",
    fontSize: 70,
    textTransform: "uppercase",
    paddingBottom: 25,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    textTransform: "uppercase",
    paddingBottom: 15,
  },
});

function Weather(wData) {
  //  Saving URL of the current icon
  const iconURL = `http://openweathermap.org/img/w/${wData.icon}.png`;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.tempPrincipal}>
          {wData ? `${wData.temp.toFixed(0)}°C` : ""}
        </Text>
      </View>
      <View style={styles.row}>
        <Image source={{ uri: iconURL }} style={{ width: 120, height: 120 }} />
        <Text style={styles.title}>{wData ? `${wData.description}` : ""}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>
          {wData ? `Min: ${wData.tempMin}°C` : ""}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>
          {wData ? `Max: ${wData.tempMax}°C` : ""}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>
          {wData ? `Feels Like: ${wData.feelsLike}°C` : ""}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>
          {wData ? `Humidity: ${wData.humidity}` : ""}
        </Text>
      </View>
    </View>
  );
}

export default Weather;

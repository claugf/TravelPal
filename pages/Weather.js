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
  title: {
    fontSize: 20,
  },
});

function Weather(wData) {
  const icon = `http://openweathermap.org/img/w/${wData.icon}.png`;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{wData ? `${wData.description}` : ""}</Text>
      <Text style={styles.title}>{wData ? `I: ${wData.icon}` : ""}</Text>
      <Image source={{ uri: icon }} style={{ width: 150, height: 150 }} />
      <Text style={styles.title}>{wData ? `Temp: ${wData.temp}` : ""}</Text>
      <Text style={styles.title}>
        {wData ? `TempMin: ${wData.tempMin}` : ""}
      </Text>
      <Text style={styles.title}>
        {wData ? `TempMax: ${wData.tempMax}` : ""}
      </Text>
      <Text style={styles.title}>{wData ? `FL: ${wData.feelsLike}` : ""}</Text>
      <Text style={styles.title}>{wData ? `H: ${wData.humidity}` : ""}</Text>
    </View>
  );
}

export default Weather;

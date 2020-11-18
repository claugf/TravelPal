import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
} from "react-native";
//  Libraries for geolocation
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function Home() {
  //  Store data about geolocation
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  //  Store reverse geocoding
  const [geoData, setGeoData] = useState({
    country: "",
    city: "",
  });
  //  Store errorMessage
  const [error, setError] = useState("");

  useEffect(() => {
    getLocationAsync();
  }, []);

  //  Function to get latitude and longitude
  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setError("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    // Saving Location temporary
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    //  Saving location into geolocation variable
    setGeoLocation({
      latitude: latitude,
      longitude: longitude,
    });
    // Calling function to retrieve reverse geodata
    getGeocodeAsync(latitude, longitude);
  }

  // Function to retrieve reverse geodata. Country and city for this specific case
  async function getGeocodeAsync(latitude, longitude) {
    let url =
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
      latitude +
      "&longitude=" +
      longitude;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let loc = json;
        setGeoData({ country: loc.countryName, city: loc.city });
      });
  }

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      blurRadius={5}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Image
          // onPress={getLocationAsync}
          // onLoad={getLocationAsync}
          source={require("../assets/marker.png")}
          style={{ width: 100, height: 100 }}
        />
        {/* <Button onPress={getLocationAsync} title="Where am I?" /> */}
        <Text style={styles.heading1}>Welcome to</Text>
        <Text style={styles.heading1}>
          {geoData ? `${geoData.city}/ ${geoData.country}` : ""}
        </Text>
        <Text style={styles.heading3}>
          {geoLocation
            ? `${geoLocation.latitude}, ${geoLocation.longitude}`
            : ""}
        </Text>
        <Text style={styles.heading2}>{error}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "#00000070",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
  },
  heading2: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  heading3: {
    color: "#fff",
    margin: 5,
  },
});

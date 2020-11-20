import React, { useRef, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
//  Libraries for menus and animations
import Animated, {
  divide,
  Extrapolate,
  interpolate,
  multiply,
} from "react-native-reanimated";
import { interpolateColor, useScrollHandler } from "react-native-redash";

//  Importing Screens/Slides
import Dot from "./Dot"; // Dot is not a screen but is a visual component
import LocationSlide from "./pages/Location";
import Weather from "./pages/Weather";

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

  //  ----->  Begining Location Logic

  //  Store data about geolocation
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  //  Store reverse geocoding
  const [geoData, setGeoData] = useState({
    country: "",
    countryCode: "",
    countryFlag: "",
    city: "",
  });
  const [geoData2, setGeoData2] = useState({
    countryFlag: "",
  });
  //  Store errorMessage
  const [error, setError] = useState("");

  useEffect(() => {
    // getLocationAsync();
    getWeather();
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
    await getGeocodeAsync(latitude, longitude);
    // console.log(latitude);
  }
  // Function to retrieve reverse geodata. Country and city for this specific case
  async function getGeocodeAsync(latitude, longitude) {
    //  Setting URL variable with the latitude and logitude given
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let loc = json;
        //  Setting GeoData
        setGeoData({
          country: loc.countryName,
          countryCode: loc.countryCode,
          city: loc.city,
        });
        //  Getting extra data
        getCountryInfoAsync(loc.countryCode);
        console.log(loc.countryCode);
      });
  }
  //  Function to retrieve Flag(Country Info) of the visited country
  async function getCountryInfoAsync(countryCode) {
    //  Setting URL variable with the latitude and logitude given
    let url = `https://api.bigdatacloud.net/data/country-info?code=${countryCode}&localityLanguage=en&key=9e7eb12fda5f4aba850ab4009ee3ceb6`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let cInfo = json;
        //  Setting GeoData
        setGeoData2({
          countryFlag: cInfo.countryFlagEmoji,
        });
        console.log(cInfo.currency.code);
      });
  }
  //  ----->  End Location Logic

  //  ----->  Begining Weather Logic
  const [wData, setwData] = useState({
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    feelsLike: 0,
    humidity: 0,
    description: "",
    icon: "",
  });

  //  Function to retrieve Weather information/ Metric System
  async function getWeather() {
    let latitude = 53.344347799999994;
    let longitude = -6.282150745391846;
    //  Setting URL variable with the latitude and logitude given
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=cbe745499d053b0abfe8a9e8c789b644`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let wInfo = json;
        //  Setting wData
        setwData({
          temp: wInfo.main.temp,
          tempMin: wInfo.main.temp_min,
          tempMax: wInfo.main.temp_max,
          feelsLike: wInfo.main.feels_like,
          humidity: wInfo.main.humidity,
          description: wInfo.weather[0].description,
          icon: wInfo.weather[0].icon,
        });
        console.log(wInfo.weather[0]);
      });
  }
  //  ----->  Begining Weather Logic

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
            {/* <Text style={styles.slideTitle}>LOCATION </Text> */}
            {LocationSlide(geoData, geoData2)}
          </View>
          {/* End Location Slide */}
          {/* Begining Weather Slide */}
          <View style={styles.slideContainer}>{Weather(wData)}</View>
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
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {/* Begining Location SubSlide */}
            <View style={styles.subSlideContainer}>
              {/* Begining Pagination */}
              <View style={styles.pagination}>
                {Dot(1)}
                {Dot(0)}
                {Dot(0)}
                {Dot(0)}
              </View>
              {/* End Pagination */}
              <Text>LOCATION</Text>
            </View>
            {/* End Location SubSlide */}
            {/* Begining Weather SubSlide */}
            <View style={styles.subSlideContainer}>
              {/* Begining Pagination */}
              <View style={styles.pagination}>
                {Dot(0)}
                {Dot(1)}
                {Dot(0)}
                {Dot(0)}
              </View>
              {/* End Pagination */}
              <Text>WEATHER</Text>
            </View>
            {/* End Weather SubSlide */}
            {/* Begining Currency SubSlide */}
            <View style={styles.subSlideContainer}>
              {/* Begining Pagination */}
              <View style={styles.pagination}>
                {Dot(0)}
                {Dot(0)}
                {Dot(1)}
                {Dot(0)}
              </View>
              {/* End Pagination */}
              <Text>CURRENCY</Text>
            </View>
            {/* End Currency SubSlide */}
            {/* Begining Data SubSlide */}
            <View style={styles.subSlideContainer}>
              {/* Begining Pagination */}
              <View style={styles.pagination}>
                {Dot(0)}
                {Dot(0)}
                {Dot(0)}
                {Dot(1)}
              </View>
              {/* End Pagination */}
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
});

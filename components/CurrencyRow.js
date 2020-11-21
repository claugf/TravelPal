import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#333",
    padding: 2,
    width: 150,
  },
});

//  Styles for the dropdown
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    marginLeft: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginLeft: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default function CurrencyRow(props) {
  //    Save currencyList given in the props
  const { currencyList, selectedCurrency, amount, text } = props;
  //    Filling an array for our dropdown
  const currencyOptions = currencyList.map((x) => ({
    label: x,
    value: x,
  }));
  // console.log(text);
  // console.log(amount);
  // console.log(amount.toString());

  const [textInput, settextInput] = useState(amount.toString());
  const [selectCurrency, setselectCurrency] = useState(selectedCurrency);

  //  Function to validate only number inputs
  function handleInputChange(text) {
    if (/^\d+$/.test(text)) {
      settextInput(text);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={textInput}
        placeholder={text}
        onChangeText={(textInput) => handleInputChange(textInput)}
      />
      <RNPickerSelect
        onValueChange={(value) => {
          setselectCurrency(value);
          console.log(value);
        }}
        useNativeAndroidPickerStyle={false}
        items={currencyOptions}
        value={selectedCurrency}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        Icon={() => {
          return <Ionicons name="md-arrow-down" size={24} color="gray" />;
        }}
      />
    </View>
  );
}

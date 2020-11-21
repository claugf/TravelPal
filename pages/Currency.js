import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Dimensions } from "react-native";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import CurrencyRow from "../components/CurrencyRow";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    margin: 0,
    marginBottom: 30,
    fontSize: 50,
  },
  equals: {
    fontWeight: "bold",
    fontSize: 30,
    margin: 10,
  },
  rowContainer: {
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

function Currency(cData) {
  //  Saves list of currencies
  const [currencyList, setCurrencyList] = useState([]);
  //  Saves fromCurrency default, USD for this project, but it allows to change it
  const [fromCurrency, setFromCurrency] = useState("USD");
  //  Saves toCurrency default
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const currencyOptions = currencyList.map((x) => ({
    label: x,
    value: x,
  }));

  const [fromInput, setFromInput] = useState(amount);
  const [dpFromSelect, setDpFromSelect] = useState(fromCurrency);
  const [toInput, setToInput] = useState();
  const [dpToSelect, setDpToSelect] = useState(toCurrency);

  //  Function to validate only number inputs
  function handleInputChange(text) {
    if (/^\d+$/.test(text)) {
      setFromInput(text);
    }
  }

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
    console.log(fromAmount);
    console.log(toAmount);
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  //  Populating the currencylists from the API
  useEffect(() => {
    populateCurrencyList();
  }, []);

  //    Function to populate my currency list
  function populateCurrencyList() {
    let url = `https://api.exchangeratesapi.io/latest?base=USD`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let currencyList = json;
        //  Setting currencyList
        setCurrencyList([
          currencyList.base,
          ...Object.keys(currencyList.rates),
        ]);
        setToCurrency(cData.currencyCode);
        setExchangeRate(currencyList.rates[cData.currencyCode]);
      });
  }

  // console.log(exchangeRate);

  function handleFromAmountChange(value) {
    setAmount(value);
    setAmountInFromCurrency(true);
    // setToInput(value);
  }

  function handleToAmountChange(value) {
    setAmount(value);
    setAmountInFromCurrency(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONVERTER</Text>
      {/* <CurrencyRow
        currencyList={currencyList}
        selectedCurrency={fromCurrency}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        text={"From"}
      /> */}
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.input}
          value={fromInput}
          placeholder={"From"}
          onChangeText={(fromInputValue) => {
            setFromInput(fromInputValue);
            handleFromAmountChange(fromInputValue * exchangeRate);
            // setToInput(fromInputValue * exchangeRate);
          }}
        />
        <RNPickerSelect
          onValueChange={(value) => {
            setDpFromSelect(value);
          }}
          useNativeAndroidPickerStyle={false}
          items={currencyOptions}
          value={fromCurrency}
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
      <Text style={styles.equals}>=</Text>
      {/* <CurrencyRow
        currencyList={currencyList}
        selectedCurrency={toCurrency}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
        text={"To"}
      /> */}
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.input}
          value={toInput}
          placeholder={"To"}
          onChangeText={(toInputValue) => setToInput(toInputValue)}
        />
        <RNPickerSelect
          onValueChange={(value) => {
            setDpToSelect(value);
            console.log(value);
          }}
          useNativeAndroidPickerStyle={false}
          items={currencyOptions}
          value={toCurrency}
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
    </View>
  );
}

export default Currency;


import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { useGlobalContext } from "../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CustomerDetails({ navigation }) {
  const { updateCustomerDetails } = useGlobalContext();
  const [customerName, setCustomerName] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerDupPassword, setCustomerDupPassword] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddressLine1, setCustomerAddress1] = useState("");
  const [customerAddressLine2, setCustomerAddress2] = useState("");
  const [customerLandMark, setCustomerLandmark] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerPincode, setCustomerPincode] = useState("");
  function checkNull(data) {
    if (data?.length > 1) {
      return true;
    } else {
      return false;
    }
  }
  function ValidateEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  const verifyPassword = (password) => {
    if (password.length < 8 || password.length > 15) {
      Alert.alert("password length must be 8 to 15 character");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      Alert.alert("password contains at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      Alert.alert("password contains at least one lowercase letter");
      return false;
    }
    if (!/\d/.test(password)) {
      Alert.alert("password contains at least one digit");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (customerName.length <= 4) {
      Alert.alert("Enter your name");
      return;
    }
    if (!checkNull(customerEmail)) {
      Alert.alert("Enter your email");
      return;
    } else {
      if (!ValidateEmail(customerEmail)) {
        Alert.alert("Enter your correct email");
        return;
      }
    }
    if (customerAddressLine1 == "") {
      Alert.alert("Enter Block No/Door No");
      return;
    }
    if (customerAddressLine2 == "" || customerAddressLine2?.length < 5) {
      Alert.alert("Enter Street Name");
      return;
    }
    if (!checkNull(customerLandMark) || customerLandMark?.length < 4) {
      Alert.alert("Enter your LandMark");
      return;
    }
    if (!checkNull(customerCity) || customerCity?.length < 4) {
      Alert.alert("Enter your City");
      return;
    }
    if (customerPincode?.length == 0) {
      Alert.alert("Enter your PinCode");
      return;
    } else {
      var pattern = /\D/;
      if (customerPincode?.length != 6 || pattern.test(customerPincode)) {
        Alert.alert("Enter Correct PinCode");
        return;
      }
    }
    if (!verifyPassword(customerPassword)) {
      return;
    }
    if (customerDupPassword != customerPassword) {
      Alert.alert("Enter your Password is Not Matching");
      return;
    }
    const phone = await AsyncStorage.getItem("customerPhoneNumber");
    const data = {
      customerName: customerName,
      customerPhoneNumber: phone,
      customerEmail: customerEmail,
      customerPassword: customerPassword,
      customerAddressLine1: customerAddressLine1,
      customerAddressLine2: customerAddressLine2,
      customerLandmark: customerLandMark,
      customerCity: customerCity,
      customerPincode: customerPincode,
    };
    updateCustomerDetails(data, navigation);
  };
  function onSubmitTester() {
    const data = {
      customerName: "Charlie",
      customerPhoneNumber: "1234567890",
      customerEmail: "Charlie@gsdmail.com",
      customerPassword: "Charlie@03",
      customerAddressLine1: "no 1",
      customerAddressLine2: "street name",
      customerLandMark: "Near KFC",
      customerCity: "Chennai",
      customerPincode: "900096",
    };
    updateCustomerDetails(data, navigation);
  }
  function navTesting() {
    navigation.replace("LandingStack");
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(name) => setCustomerName(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mail Id"
        onChangeText={(mail) => setCustomerEmail(mail)}
      />
      <TextInput
        style={styles.input}
        placeholder="Block No/Door No"
        onChangeText={(address) => setCustomerAddress1(address)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Name"
        onChangeText={(address2) => setCustomerAddress2(address2)}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark"
        onChangeText={(landmark) => setCustomerLandmark(landmark)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        onChangeText={(city) => setCustomerCity(city)}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Pincode"
        onChangeText={(pincode) => setCustomerPincode(pincode)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(password) => setCustomerPassword(password)}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-Enter Password"
        onChangeText={(dupPassword) => setCustomerDupPassword(dupPassword)}
      />
      <Button onPress={onSubmit} title="submit"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontWeight: "bold",
  },
  input: {
    height: 35,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 220,
    borderRadius: 7,
  },
});

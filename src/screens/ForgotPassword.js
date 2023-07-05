import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ForgotPassword = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { getOtp, otpVerify } = useGlobalContext();
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const generateOtp = () => {
    const data = getOtp(customerPhoneNumber);
    if (data) {
      setFlag(true);
    } else {
      Alert.alert('Register Please');
    }
  }
  const otpVerification = () => {
    otpVerify(otp, navigation, "PasswordUpdateScreen")
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
        paddingHorizontal: "3%",
      }}
    >
      <Text>ForgotPassword</Text>
      <TextInput style={styles.input}
        keyboardType="numeric"
        onChangeText={(customerPhoneNumber) =>
          setCustomerPhoneNumber(customerPhoneNumber)
        }
        placeholder="Phone Number"
      />
      <Pressable
        onPress={() => generateOtp()}
        style={{ paddingTop: 15, paddingBottom: 8 }}
      ></Pressable>
      {flag == true ? <OtpCard otpVerification={otpVerification} setOtp={setOtp} /> : null}
    </View>
  );
};

const OtpCard = ({ otpVerification, setOtp }) => {
  <View style={styles.container}>
    <Text>Enter OTP</Text>
    <TextInput
      keyboardType="numeric"
      onChangeText={(otp) => setOtp(otp)}
      style={styles.input}
      placeholder="otp..."
    />
    <Button onPress={otpVerification} title="submit"></Button>
  </View>
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: 35,
    marginVertical: 7,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "70%",
    borderRadius: 7,
  },
});
export default ForgotPassword;

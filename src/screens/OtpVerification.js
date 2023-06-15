import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";
const OtpVerification = ({navigation}) => {
  const [otp,setOtp] = useState();
  const { otpVerify } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const onSubmit = () => {
    // console.log(otp);
    otpVerify(otp,navigation);
    // navigation.navigate("CustomerDetails");
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
      }}
    >
      <View style={styles.container}>
        <Text>Enter OTP</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(otp) => setOtp(otp)}
          style={styles.input}
          placeholder="otp..."
        />
        <Button onPress={onSubmit} title="submit"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: "space-between",
    alignItems: "center",
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

export default OtpVerification;

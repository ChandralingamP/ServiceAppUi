import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalContext";
export default function LoginScreen({ navigation }) {
  // const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const { login, setCustomerPhoneNumber } = useGlobalContext();
  const onSubmit = () => {
    login(customerPassword, navigation, "CustomerDetails");
  };
  const Navto = (screen) => {
    navigation.navigate(screen);
  };
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>LOGIN</Text>
      <View
        style={{
          paddingLeft: 4,
          marginTop: 20,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(customerPhoneNumber) =>
            setCustomerPhoneNumber(customerPhoneNumber)
          }
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={(customerPassword) =>
            setCustomerPassword(customerPassword)
          }
          placeholder="Password"
        />
        <Pressable
          onPress={() => onSubmit()}
          style={{ paddingTop: 15, paddingBottom: 8 }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              backgroundColor: "blue",
              paddingVertical: 5,
              borderRadius: 5,
              paddingHorizontal: 30,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Login
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => Navto("ForgotPassword")}
        style={{ paddingTop: 15, paddingBottom: 8 }}
      >
        <Text style={{ fontSize: 16, color: "blue" }}>Forgot Password ?</Text>
      </Pressable>
      <Pressable onPress={() => Navto("Register")} style={{ padding: 5 }}>
        <Text style={{ fontSize: 16, color: "blue" }}>Create New account</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
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

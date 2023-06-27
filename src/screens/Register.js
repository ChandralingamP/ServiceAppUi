import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalContext";
const Register = ({ navigation }) => {
  const { customerPhoneNumber, setCustomerPhoneNumber, register } =
    useGlobalContext();
  const insets = useSafeAreaInsets();
  const onSubmit = () => {
    register(navigation);
  };
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
      <View style={styles.container}>
        <Text className="text-lg bg-black">Register</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(customerPhoneNumber) =>
            setCustomerPhoneNumber(customerPhoneNumber)
          }
          style={styles.input}
          placeholder="Re-Enter Password"
        />
        <Pressable
          onPress={onSubmit}
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
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={()=>navigation.goBack()}
          style={{ padding: 5 }}
        >
          <Text  style={{ fontSize: 16, color: "blue" }}>
            Create New account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default Register;

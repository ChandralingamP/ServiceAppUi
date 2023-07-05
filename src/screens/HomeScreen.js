import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { ServiceCard } from "../components/ServiceCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { services } from "../utils/Services";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function HomeScreen({ navigation }) {
  const NavTo = (type) => {
    navigation.navigate("ServiceStack", {
      screen: "ServiceCategoryScreen",
      params: { category: type },
    });
  };
  const [AddressLine1, setAddressLine1] = useState(null);
  const [AddressLine2, setAddressLine2] = useState(null);
  const insets = useSafeAreaInsets();
  const initialize = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('userData'));
    console.log(data);
    setAddressLine1(data.customerAddressLine1)
    setAddressLine2(data.customerAddressLine2)
  }
  useEffect(() => {
    initialize();
  }, [])
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
      <Text
        style={{
          marginTop: 7,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {AddressLine1}
      </Text>
      <Text style={{ marginTop: 1, fontSize: 13 }}>{AddressLine2}</Text>
      <TextInput style={styles.input} placeholder="type to search"></TextInput>
      <ScrollView>
        <Text style={{ fontSize: 28, marginTop: 5, fontWeight: "bold" }}>
          Services
        </Text>
        <View style={styles.box}>
          {services.map((service, key) => {
            return (
              <ServiceCard
                key={key}
                NavTo={NavTo}
                service={service}
              ></ServiceCard>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 35,
    marginTop: 12,
    fontSize: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    width: "94%",
    borderRadius: 7,
  },
  box: {
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

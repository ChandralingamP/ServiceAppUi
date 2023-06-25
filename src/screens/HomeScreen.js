import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { ServiceCard } from "../components/ServiceCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { services } from "../utils/Services";
export default function HomeScreen({ navigation }) {
  const NavTo = (type) => {
    navigation.navigate("ServiceStack", {
      screen: "ServiceCategoryScreen",
      params: { category: type },
    });
  };
  const insets = useSafeAreaInsets();
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
        Address Line 1
      </Text>
      <Text style={{ marginTop: 1, fontSize: 13 }}>Address Line 2</Text>
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

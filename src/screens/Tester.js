import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Address Line 1</Text>
      <Text style={{ fontSize: 10 }}>Address Line 2</Text>
      <TextInput style={styles.input} placeholder="type to search"></TextInput>
      <ScrollView>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {" "}
          Popular services
        </Text>
        <View style={styles.box}>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
        </View>
      </ScrollView>
    </View>
  );
}

const ServiceCard = () => {
  return (
    <View style={{ width: "33%", height: 130 }}>
      <Image
        source={require("./assets/Ac.jpg")}
        style={{ width: "90%", height: 90 }}
      ></Image>
      <Text>Service Card</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    marginLeft: 10,
  },

  input: {
    height: 35,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 350,
    borderRadius: 7,
  },
  box: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    // display : 'grid',
    // gridTemplateColumns:'auto auto auto'
  },
});

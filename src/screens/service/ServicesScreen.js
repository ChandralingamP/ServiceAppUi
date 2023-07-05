import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalContext";
export default function ServiceScreen({ navigation }) {
  const NavTo = (screen, params) => {
    navigation.navigate(screen, { serviceId: params });
  };
  const NavToCategory = (type) => {
    navigation.navigate("ServiceCategoryScreen", {
      category: type,
    });
  };
  const insets = useSafeAreaInsets();
  const { getAllServiceData, serviceData, tester } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log(serviceData,"c");
    if (serviceData) {
      setIsLoading(true);
    } else {
      getAllServiceData();
    }
  }, [serviceData]);
  if (isLoading == false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: insets.top,
          marginBottom: insets.bottom,
          marginLeft: insets.left,
          marginRight: insets.right,
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginTop: insets.top,
          marginBottom: insets.bottom,
          marginLeft: insets.left,
          marginRight: insets.right,
        }}
      >
        <Text
          style={{
            marginHorizontal: "3%",
            fontSize: 28,
            marginTop: 5,
            fontWeight: "bold",
          }}
        >
          Services {tester}
        </Text>
        <ScrollView style={{ marginHorizontal: "3%" }}>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: 500 }}>AC Services</Text>
              <Pressable
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
                onPress={() => NavToCategory("AC")}
              >
                <Text style={{ color: "#006da8" }}>View All </Text>
                <Icon name="angle-double-right" size={17} color="#006da8" />
              </Pressable>
            </View>
            <View style={styles.box}>
              {serviceData?.AcServices?.slice(0, 6).map((service) => {
                return (
                  <ServiceCard
                    key={service.serviceId}
                    NavTo={NavTo}
                    image={require("../../assets/" + "Ac.jpg")}
                    service={service}
                  ></ServiceCard>
                );
              })}
            </View>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: 500 }}>
                Electrical Services
              </Text>
              <Pressable
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
                onPress={() => NavToCategory("Electrical")}
              >
                <Text style={{ color: "#006da8" }}>View All </Text>
                <Icon name="angle-double-right" size={17} color="#006da8" />
              </Pressable>
            </View>
            <View style={styles.box}>
              {serviceData?.ElectricalServices?.map((service, key) => {
                return (
                  <ServiceCard
                    key={key}
                    NavTo={NavTo}
                    service={service}
                    image={require("../../assets/" + "electrical.jpg")}
                  ></ServiceCard>
                );
              })}
            </View>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: 500 }}>
                Plumbing Services
              </Text>
              <Pressable
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
                onPress={() => NavToCategory("Plumbing")}
              >
                <Text style={{ color: "#006da8" }}>View All </Text>
                <Icon name="angle-double-right" size={17} color="#006da8" />
              </Pressable>
            </View>
            <View style={styles.box}>
              {serviceData?.PlumbingServices?.map((service, key) => {
                let imgPath =
                  "../../assets/" + service != null
                    ? service?.serviceImagefile
                    : "electrical.jpg";
                return (
                  <ServiceCard
                    key={service.serviceId}
                    NavTo={NavTo}
                    service={service}
                    image={require("../../assets/" + "plumbing.jpg")}
                  ></ServiceCard>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ServiceCard = ({ service, NavTo, image }) => {
  const navigateTo = () => {
    NavTo("SingleServiceScreen", service.serviceId);
  };
  return (
    <Pressable
      onPress={() => navigateTo(service.serviceId)}
      style={{
        width: "32.5%",
        backgroundColor: "gray",
        display: "flex",
        height: 130,
        borderRadius: 5,
        marginVertical: 2.5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={image}
        style={{ width: "90%", height: 100, alignItems: "center" }}
      ></Image>
      <Text style={{ textAlign: "center", fontWeight: 600 }}>
        {service.serviceCategory}
      </Text>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  input: {
    height: 35,
    marginTop: 12,
    fontSize: 12,
    paddingHorizontal: 10,
    marginHorizontal: "3%",
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

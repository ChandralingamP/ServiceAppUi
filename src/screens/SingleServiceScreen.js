import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { get, post } from "../services/WebServices";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SingleServiceScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [serviceId, setServiceId] = useState("AC");
  const [flag, setFlag] = useState(false);
  const [serviceData, setServiceData] = useState("");
  const [cartFlag, setCartFlag] = useState(false);
  const addToCart = async (id) => {
    try {
      const result = await post("cart/add", {
        customerPhoneNumber: "9874563210",
        serviceId: id,
      });
      console.log(result.status + "ag");
      if (result.status == true) {
        setCartFlag(true);
        console.log(cartFlag);
      } else {
        setCartFlag(false)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getServiceData = async (ServiceId) => {
    try {
      const data = await get("services/details/service/" + ServiceId + "/9874563210");
      setServiceData(data);
      if (serviceData.status == true) {
        setCartFlag(true);
      } else {
        setCartFlag(false);
      }
      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };
  const cat = route?.params?.serviceId;
  useEffect(() => {
    setFlag(false);
    if (serviceId) {
      if (cat) {
        if (serviceId == cat) {
          getServiceData(serviceId);
        } else {
          setServiceId(route?.params?.serviceId);
        }
      }
    } else {
      setServiceId(route?.serviceId);
    }
  }, [serviceId, cat]);
  if (flag) {
    return (
      <View
        style={{
          flex: 1,
          marginTop: insets.top,
          marginBottom: insets.bottom,
          marginLeft: insets.left,
          marginRight: insets.right,
          paddingHorizontal: "3%",
          paddingTop: 10,
        }}
      >
        <ScrollView>
          <ServiceCard flag={serviceData.status} service={serviceData?.service} addToCart={addToCart} />
          <Text style={{ fontSize: 25, fontWeight: "bold", paddingLeft: 10 }}>
            Related Service
          </Text>
          <View style={styles.box}>
            {serviceData?.relatedServices?.map((service) => {
              return (
                <RelatedServiceCard
                  key={service.serviceId}
                  service={service}
                  getServiceData={getServiceData}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};
const ServiceCard = ({ service, addToCart, flag }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <View style={{ width: "67%" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {service.serviceCategory}
        </Text>
        <Text style={{ fontSize: 20 }}>₹{service.servicePrice}</Text>
        {/* <Text style={styles.Text1}>₹Price</Text> */}
        <Text style={{ width: "99%", fontSize: 12 }}>
          {service.serviceDescription.slice(0, 95)}...
        </Text>
        <View
          style={{
            marginTop: 5,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ButtonCard flag={flag} service={service} addToCart={addToCart} />
        </View>
      </View>
      <View style={{ width: "33%" }}>
        <Image
          source={require("../assets/Ac.jpg")}
          style={{ width: "100%", height: 120, marginTop: 10 }}
        ></Image>
      </View>
    </View>
  );
};

const ButtonCard = ({ service, flag, addToCart }) => {
  console.log(flag);
  if (flag == true) {
    return (
      <Pressable
        style={{
          height: 26,
          width: "50%",
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
        }}
        onPress={() => addToCart(service.serviceId)}
      >
        <Text
          style={{
            fontSize: 16,
            padding: 2,
            fontWeight: 500,
            color: "white",
          }}
        >
          Check Out
        </Text>
      </Pressable>
    )
  } else {
    return (
      <Pressable
        style={{
          height: 26,
          width: "50%",
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
        }}
        onPress={() => addToCart(service.serviceId)}
      >
        <Text
          style={{
            fontSize: 16,
            padding: 2,
            fontWeight: 500,
            color: "white",
          }}
        >
          Add to Cart
        </Text>
      </Pressable>)
  }
}


const RelatedServiceCard = ({ service, getServiceData }) => {
  // const ServiceCard = ({ service, NavTo }) => {
  return (
    <Pressable
      onPress={() => getServiceData(service.serviceId)}
      style={{
        width: "32.5%",
        backgroundColor: "gray",
        display: "flex",
        marginVertical: 5,
        height: 150,
        borderRadius: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/Ac.jpg")}
        style={{ width: "90%", height: 100, alignItems: "center" }}
      ></Image>
      <Text style={{ textAlign: "center", fontWeight: 600 }}>
        {service.serviceCategory}
      </Text>
    </Pressable>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  outterbox: {
    paddingTop: 10,
    padding: 19,
    flexDirection: "row",
    flexWrap: "wrap",
    // height:50
  },
  Text1: {
    textDecorationLine: "line-through",
    fontSize: 15,
  },
  create: {
    padding: 20,
    paddingLeft: 125,
  },
  create1: {
    paddingLeft: 130,
  },
});

export default SingleServiceScreen;

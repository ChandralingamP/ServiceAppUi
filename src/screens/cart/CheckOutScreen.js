import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddressCard from '../../components/AddressCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeSlotPicker from '../../components/TimeSlotPicker';
import { get, put } from '../../services/WebServices';
const CheckoutPage = ({ navigation, route }) => {
  const serviceFee = 50; // Example service fee
  const taxRate = 0.1; // Example tax rate
  const total = serviceFee + serviceFee * taxRate;
  const insets = useSafeAreaInsets();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [service, setService] = useState(route.params?.service);
  const [addressData, setAddressData] = useState([]);
  const goToPayment = async  () => {
    navigation.navigate('PaymentScreen', { service: service })
    
  };
  const updateTimeSlot = async () => {
    const data = await put("cart/update/address/time", {
      cartId: service.cartId,
      customerAddressId: "7a8f4f322821815c256f3da328ba0c7614f3ad223d20e7d1f1c1ffecef7b9d0e",
      timeSlot: selectedTimeSlot
    })
    console.log(data);
    if(data.status){
      navigation.navigate('PaymentScreen', { service: service });
    }
  }
  const getAddresses = async () => {
    const customerData = JSON.parse(await AsyncStorage.getItem("userData"));
    console.log(customerData.customerPhoneNumber);
    const data = await get(
      "customer/addresses/" + customerData.customerPhoneNumber
    );
    setAddressData(data);
  };
  useEffect(() => {
    getAddresses();
  }, []);
  return (
    <View style={{
      flex: 1,
      marginTop: insets.top,
      marginBottom: insets.bottom,
      marginLeft: insets.left,
      marginRight: insets.right,
      paddingHorizontal: "3%",
    }}>
      <Text style={styles.title}>Checkout</Text>
      <ServiceCard service={service} />
      {
        addressData.map((item, key) => {
          console.log(item, "item");
          return <AddressCard key={key} address={item} />
        })
      }
      <TimeSlotPicker selectedTimeSlot={selectedTimeSlot} setSelectedTimeSlot={setSelectedTimeSlot} />
      <Button title="Next" onPress={()=>updateTimeSlot()} />
    </View>
  );
};


const ServiceCard = ({ service }) => {
  useEffect(() => {
  }, [service])
  return (
    <View style={{ display: "flex", height: 140, flexDirection: "row", flexWrap: "wrap" }}>
      <View style={{ width: "67%", maxHeight: 130, overflow: 'hidden' }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", maxHeight: 60, overflow: 'hidden' }} numberOfLines={2} ellipsizeMode="tail">
          {service.serviceCategory}
        </Text>
        <Text style={{ paddingRight: 4 }} numberOfLines={4} ellipsizeMode="tail">
          {service.serviceDescription}
        </Text>
      </View>
      <View style={{ width: "33%" }}>
        <Image
          source={require("../../assets/Ac.jpg")}
          style={{ width: "100%", height: 120, marginTop: 10 }}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  serviceContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  feeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default CheckoutPage;


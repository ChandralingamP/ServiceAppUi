import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import {put} from "../../services/WebServices"
import { useSafeAreaInsets } from "react-native-safe-area-context";
const PaymentScreen = ({ navigation, route }) => {

    const insets = useSafeAreaInsets();
    const handlePayment = async() => {
        const data = await put("cart/update/payment", { cartId: service.cartId });
        if (data.status) {
            alert('Payment successful!');
        } else {
            alert('Payment not successful!');
        }
    };
    const [service, setService] = useState(route.params?.service);
    return (
        <View style={{
            flex: 1,
            marginTop: insets.top,
            marginBottom: insets.bottom,
            marginLeft: insets.left,
            marginRight: insets.right,
            paddingHorizontal: "3%",
        }}>
            <Text style={styles.title}>Payment</Text>
            <ServiceCard service={service} />
            <PaymentCard service={service} />
            <Button title="Pay Now" onPress={handlePayment} />
        </View>
    );
};



const ServiceCard = ({ service }) => {
    console.log(service, "InserviceCard");
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

const PaymentCard = ({ service }) => {
    const serviceFee = 50;
    const taxRate = 0.1;
    const total = serviceFee + serviceFee * taxRate;
    return (
        <View>
            <View style={styles.serviceContainer}>
                <Text style={styles.label}>Service Price:</Text>
                <Text style={styles.value}>$ {service.servicePrice}</Text>
            </View>
            <View style={styles.feeContainer}>
                <Text style={styles.label}>Service Fee:</Text>
                <Text style={styles.value}>$ {serviceFee.toFixed(2)}</Text>
            </View>
            <View style={styles.feeContainer}>
                <Text style={styles.label}>Tax ({(taxRate * 100).toFixed(2)}%):</Text>
                <Text style={styles.value}>$ {(serviceFee * taxRate).toFixed(2)}</Text>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.label}>Total:</Text>
                <Text style={styles.value}>$ {total.toFixed(2)}</Text>
            </View>
        </View>
    )
}

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

export default PaymentScreen;


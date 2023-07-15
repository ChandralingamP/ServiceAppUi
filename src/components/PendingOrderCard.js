import React from "react";
import { View, Text, StyleSheet } from "react-native";
const PendingOrderCard = ({ order }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.value}>{order.serviceType}</Text>
                <View style={{ backgroundColor: "red", borderRadius: 4 }}>
                    <Text
                        style={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: 17,
                            padding: 4,
                            paddingHorizontal: 10,
                        }}
                    >
                        Pending
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {order.serviceCategory}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>{order.timeSlot}</Text>
            </View>
            <View style={styles.row}>
                <Text
                    style={{
                        flex: 2,
                        fontSize: 16,
                        paddingVertical: 2,
                        fontWeight: 400,
                        alignContent: "center",
                    }}
                >
                    {order.customerPhoneNumber}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
    },
    label: {
        flex: 2,
        fontSize: 16,
        fontWeight: "bold",
    },
    value: {
        flex: 2,
        fontSize: 20,
        fontWeight: 500,
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default PendingOrderCard;

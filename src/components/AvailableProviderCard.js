import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from "@expo/vector-icons";
const AvailableProviderCard = ({ provider }) => {
    const handleCopyText = () => {
        Clipboard.setStringAsync(provider.providerId);
    };
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.value}>{provider.providerRole}</Text>
                <View style={{ backgroundColor: "green", borderRadius: 4 }}>
                    <Text
                        style={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: 17,
                            padding: 4,
                            paddingHorizontal: 10,
                        }}
                    >
                        Available
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {provider.providerPhoneNumber}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={{ fontSize: 16 }}>Rating {provider.providerRating}</Text>
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
                    Handled {provider.providerCount}
                </Text>
                <TouchableOpacity onPress={handleCopyText}>
                    <Ionicons name="copy" size={22} color="black" />
                </TouchableOpacity>
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

export default AvailableProviderCard;

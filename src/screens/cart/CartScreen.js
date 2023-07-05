import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalContext";
const CartScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { cartData, setCartData, navigateToCheckOut, removeItem, getCartData } = useGlobalContext();
    useEffect(() => {
        getCartData();
    }, []);
    if (cartData) {
        return (
            <View
                style={{
                    flex: 1,
                    marginTop: insets.top,
                    marginBottom: insets.bottom,
                    marginLeft: insets.left,
                    marginRight: insets.right,
                    paddingHorizontal: "3%",
                }}
            >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 15, paddingBottom: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                    <Ionicons name="cart" size={34} color={'black'} />
                    <Text style={{ fontSize: 24, fontWeight: 700, marginLeft: 5 }}>Cart</Text>
                </View>
                <ScrollView style={{ marginTop: 2 }}>
                    {cartData?.map((item, key) => {
                        return <CartItem key={key} item={item} removeItem={removeItem} navigateToCheckOut={navigateToCheckOut} navigation={navigation} />
                    })}
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View style={{
                flex: 1,
                marginTop: insets.top,
                marginBottom: insets.bottom,
                marginLeft: insets.left,
                marginRight: insets.right,
                paddingHorizontal: "3%",
            }}><Text>Loading dude</Text></View>
        )
    }
};


const CartItem = ({ navigateToCheckOut, item, removeItem, navigation }) => {
    return (
        <View style={{ backgroundColor: 'gray', marginTop: 8, padding: 10, borderRadius: 10, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ height: 100, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 22, fontWeight: 700 }}>{item.serviceCategory}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 500, alignContent: 'center', display: 'flex' }}><Icon name="rupee" size={15} color="black" />{item.servicePrice}</Text>
                </View>
                <View style={{ width: '25%', borderRadius: 8 }}>
                    <Image
                        source={require("../../assets/Ac.jpg")}
                        style={{ width: "100%", height: "85%", }}
                    ></Image>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable onPress={() => removeItem(item.cartId)} style={{ width: '48.5%', borderRadius: 3, alignItems: 'center', backgroundColor: 'white', padding: 6 }}><Text>Remove</Text></Pressable>
                <Pressable onPress={() => navigation.navigate('CheckOutScreen',{service :item })} style={{ width: '48.5%', borderRadius: 3, alignItems: 'center', backgroundColor: 'white', padding: 6 }}><Text>Check Out</Text></Pressable>
            </View>
        </View>
    )
}


export default CartScreen;

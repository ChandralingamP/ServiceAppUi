import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import CartScreen from "../screens/cart/CartScreen";
import CheckOutScreen from "../screens/cart/CheckOutScreen";
import { ServiceProvider } from "../context/ServiceContext";
const ProfileStack = () => {
  return (
    <ServiceProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, initialRouteName: "CartScreen" }}
      >
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      </Stack.Navigator>
    </ServiceProvider>
  );
};

export default ProfileStack;

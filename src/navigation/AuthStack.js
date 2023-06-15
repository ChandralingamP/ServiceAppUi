import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "../screens/Register";
import OtpVerification from "../screens/OtpVerification";
import CustomerDetails from "../screens/CustomerDetails";
import LandingStack from "./LandingStack";
import LoginScreen from "../screens/LoginScreen";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="LandingStack" component={LandingStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;

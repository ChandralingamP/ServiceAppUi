import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicesScreen from "../screens/service/ServicesScreen";
import SingleServiceScreen from "../screens/service/SingleServiceScreen";
import ServiceCategoryScreen from "../screens/service/ServiceCategoryScreen";
import { GlobalProvider } from "../context/GlobalContext";
import { ServiceProvider } from "../context/ServiceContext";
const Stack = createNativeStackNavigator();
const ServiceStack = () => {
  return (
    <ServiceProvider>
      <Stack.Navigator screenOptions={{ headerShown: false, initialRouteName: "ServicesScreen" }}>
        <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
        <Stack.Screen
          name="ServiceCategoryScreen"
          component={ServiceCategoryScreen}
        />
        <Stack.Screen
          name="SingleServiceScreen"
          component={SingleServiceScreen}
        />
      </Stack.Navigator>
    </ServiceProvider>
  );
};

export default ServiceStack;

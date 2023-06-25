import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ServiceStack from "./ServiceStack";
import ProfileStack from "./ProfileStack";
import CartStack from "./CartStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const LandingStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            iconComponent = (
              <Ionicons name="home" size={size} color={color} />
            );
          } else if (route.name === "ServiceStack") {
            iconComponent = (
              <FontAwesome5 name="tools" size={size} color={color} />
            );
          } else if (route.name === "ProfileStack") {
            iconComponent = (
              <Ionicons name="person-circle" size={size} color={color} />
            );
          } else if (route.name === "CartStack") {
            iconComponent = (
              <Ionicons name="cart" size={size} color={color} />
            );
          }
          return iconComponent;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ServiceStack" component={ServiceStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
      <Tab.Screen name="CartStack" component={CartStack} />
    </Tab.Navigator>
  );
};

export default LandingStack;

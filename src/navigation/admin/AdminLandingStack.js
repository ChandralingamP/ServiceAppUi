import React from "react";
import ProfileStack from "../ProfileStack.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderScreen from "../../screens/admin/OrderScreen.js";
import ProviderScreen from "../../screens/admin/ProviderScreen.js";
import AdminProfileScreen from "../../screens/admin/AdminProfileScreen.js";
const Tab = createBottomTabNavigator();
const LandingStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Providers" component={ProviderScreen} />
      <Tab.Screen name="Profile" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
};

export default LandingStack;

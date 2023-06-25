import React from "react";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import YourOrdersScreen from "../screens/profile/YourOrdersScreen";
import YourAddressScreen from "../screens/profile/YourOrdersScreen";
import AboutScreen from "../screens/profile/AboutScreen";
import ContactUsScreen from "../screens/profile/ContactUsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import FeedBackScreen from "../screens/profile/FeedBackScreen";
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, initialRouteName: "ProfileScreen" }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="YourOrdersScreen" component={YourOrdersScreen} />
      <Stack.Screen name="YourAddressScreen" component={YourAddressScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Stack.Screen name="FeedBackScreen" component={FeedBackScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

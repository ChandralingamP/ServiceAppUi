import React, { useEffect } from "react";
import AuthStack from "./AuthStack";
import LandingStack from "./LandingStack";
import { NavigationContainer } from "@react-navigation/native";
// import ForgotPassword from "../screens/ForgotPassword";
const AppNav = () => {
  const getData = () => {};
  useEffect(() => {
    getData;
  }, []);
  return (
    <NavigationContainer>
      {/* <AuthStack/> */}
      <LandingStack />
      {/* <ForgotPassword /> */}
    </NavigationContainer>
  );
};

export default AppNav;

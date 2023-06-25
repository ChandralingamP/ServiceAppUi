import React, { useEffect } from "react";
import AuthStack from "./AuthStack";
import LandingStack from "./LandingStack";
import { NavigationContainer } from "@react-navigation/native";
const AppNav = () => {
  const getData = () => {};
  useEffect(() => {
    getData;
  }, []);
  return (
    <NavigationContainer>
      {/* <AuthStack/> */}
      <LandingStack />
    </NavigationContainer>
  );
};

export default AppNav;

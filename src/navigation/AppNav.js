import React, { useEffect } from "react";
import AuthStack from "./AuthStack";
import LandingStack from "./LandingStack";
import { NavigationContainer } from "@react-navigation/native";
import { useGlobalContext } from "../context/GlobalContext";
const AppNav = () => {
  const { userToken } = useGlobalContext();
  return (
    <NavigationContainer>
      {userToken !== null ? <LandingStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;

import React, { useEffect } from "react";
import AuthStack from "./AuthStack";
import LandingStack from "./LandingStack";
import { NavigationContainer } from "@react-navigation/native";
import { useGlobalContext } from "../context/GlobalContext";
import AdminLandingStack from "./admin/AdminLandingStack"
const AppNav = () => {
  const { userToken, isLoggedIn ,isAdmin} = useGlobalContext();
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <NavigationContainer>
      {userToken !== null ? isAdmin == true ? <AdminLandingStack/> : <LandingStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;

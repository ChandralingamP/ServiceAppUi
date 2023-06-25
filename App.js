import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNav from "./src/navigation/AppNav";
import { GlobalProvider, useGlobalContext } from "./src/context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const { isLogged, setIsLogged } = useGlobalContext;
  const isLoggedIn = async () => {
    try {
      const flag = await AsyncStorage.getItem("userAccess");
      if (flag !== null) {
        setIsLogged(true);
      }
    } catch (error) {
      setIsLogged(false);
    }
  };

  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <AppNav />
      </GlobalProvider>
    </SafeAreaProvider>
  );
}

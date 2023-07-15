import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNav from "./src/navigation/AppNav";
import { GlobalProvider } from "./src/context/GlobalContext";
export default function App() {


  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <AppNav />
      </GlobalProvider>
    </SafeAreaProvider>
  );
}

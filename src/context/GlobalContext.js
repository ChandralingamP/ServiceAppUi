import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData } from "./Storage";
import { get, post, remove, put } from "../services/WebServices";
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

  const login = async (customerPassword, navigation) => {
    if (validatePhoneNumber(customerPhoneNumber)) {
      saveData("customerPhoneNumber", customerPhoneNumber);
      if (customerPassword == "") {
        Alert.alert("Enter Password");
      }
      try {
        console.log(
          `customer/login/${customerPhoneNumber}/${customerPassword}`
        );
        const data = await get(
          `customer/login/${customerPhoneNumber}/${customerPassword}`
        );
        console.log(data);
        if (data.msg) {
          navigation.replace("LandingStack");
        } else {
          Alert.alert("Invalid phoneNumber / Password");
          return;
        }
      } catch (err) {
        Alert.alert("Internet Error Try Again Later!");
        return;
      }
    } else if (customerPhoneNumber == "") {
      Alert.alert("Enter Mobile Number");
      return;
    } else {
      Alert.alert("Enter Correct Mobile Number");
      return;
    }
  };
  const register = async (navigation) => {
    if (validatePhoneNumber(customerPhoneNumber)) {
      saveData("customerPhoneNumber", customerPhoneNumber);
      const data = await post("customer/register", {
        customerPhoneNumber: customerPhoneNumber,
      });
      if (data.msg) {
        Alert.alert("Already Registered Please Register!");
      } else {
        saveData("customerId", data.customerId);
        saveData("otp", data.otp);
        navigation.navigate("OtpVerification");
      }
    } else if (customerPhoneNumber == "") {
      Alert.alert("Enter Mobile Number");
      return;
    } else {
      console.log(customerPhoneNumber);
      Alert.alert("Enter Correct Mobile Number");
      return;
    }
  };
  function validatePhoneNumber(customerPhoneNumber) {
    console.log("hi");
    var regexPattern = /^[0-9]{10}$/;
    if (regexPattern.test(customerPhoneNumber)) {
      return true;
    } else {
      return false;
    }
  }
  const otpVerify = async (data, navigation) => {
    const value = await AsyncStorage.getItem("otp");
    console.log(data + "  " + value);
    if (data == value) {
      navigation.navigate("CustomerDetails");
      return true;
    } else {
      Alert.alert("Enter correct Opt");
      return;
    }
  };
  const updateCustomerDetails = async (data, navigation) => {
    try {
      const a = await put("customer/details", data);
      saveData("userAccess", "true");
      navigation.replace("LandingStack");
    } catch (err) {
      Alert.alert("Try Again Later!");
      return;
    }
  };

  // context for services

  const [serviceData, setServiceData] = useState("null");
  const getServiceData = async () => {
    const data = await get("services/details");
    setServiceData(data);
  };
  

  return (
    <GlobalContext.Provider
      value={{
        customerPhoneNumber,
        isLogged,
        login,
        setCustomerPhoneNumber,
        register,
        setIsLogged,
        otpVerify,
        updateCustomerDetails,
        serviceData,
        setServiceData,
        getServiceData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData } from "./Storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { get, post, remove, put } from "../services/WebServices";
import { useAuthContext } from "./AuthContext";

const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const loginAuth = (token) => {
    setUserToken(token);
  }
  const logoutAuth = () => {
    setUserToken(null);
  }
  const tester = "hi";
  const [customerId, setCustomerId] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

  const login = async (customerPassword, navigation, screen) => {

    if (validatePhoneNumber(customerPhoneNumber)) {
      saveData("customerPhoneNumber", customerPhoneNumber);
      if (customerPassword == "") {
        Alert.alert("Enter Password");
      }
      try {
        const data = await get(
          `customer/login/${customerPhoneNumber}/${customerPassword}`
        );
        if (data.msg) {
          loginAuth(customerPhoneNumber);
          // navigation.replace("LandingStack", { navScreen: screen });
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
      Alert.alert("Enter Correct Mobile Number");
      return;
    }
  };
  function validatePhoneNumber(customerPhoneNumber) {
    var regexPattern = /^[0-9]{10}$/;
    if (regexPattern.test(customerPhoneNumber)) {
      return true;
    } else {
      return false;
    }
  }
  const otpVerify = async (data, navigation, screen) => {
    const value = await AsyncStorage.getItem("otp");
    if (data == value) {
      navigation.navigate(screen);
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

  const [serviceData, setServiceData] = useState("");
  const [SSSFlag, setSSSFlag] = useState(false);
  const [serviceInCartFlag, setServiceInCartFlag] = useState(false);
  const getAllServiceData = async () => {
    const data = await get("services/details");
    setServiceData(data);
  };
  const addToCart = async (service) => {
    try {
      const result = await post("cart/add", {
        customerPhoneNumber: "9874563210",
        serviceId: service.serviceId,
      });
      if (result.status == true) {
        setCartData([...cartData, service]);
        setServiceInCartFlag(true);
      } else {
        setServiceInCartFlag(false)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getServiceData = async (ServiceId) => {
    try {
      const data = await get("services/details/service/" + ServiceId + "/9874563210");
      setServiceData(data);
      if (serviceData.status == true) {
        setServiceInCartFlag(true);
      } else {
        setServiceInCartFlag(false);
      }
      setSSSFlag(true);
    } catch (err) {
      console.log(err);
    }
  };




  // Cart
  const [cartData, setCartData] = useState();
  const navigateToCheckOut = () => {
    navigation.navigate('CheckOutScreen');
  }
  const removeItem = async (id) => {
    const response = await remove("cart/remove/" + id);
    if (response?.status) {
      const newData = cartData.filter((item) => item.cartId != id);
      setCartData(newData);
    }
  }

  const getCartData = async () => {
    const data = await get('cart/get/9874563210');
    setCartData(data);
  }

  return (
    <GlobalContext.Provider
      value={{
        userToken,
        logoutAuth,
        tester,
        customerPhoneNumber,
        isLogged,
        login,
        setCustomerPhoneNumber,
        register,
        setIsLogged,
        otpVerify,
        updateCustomerDetails,
        getServiceData,
        getAllServiceData,
        cartData,
        setCartData,
        navigateToCheckOut,
        removeItem,
        getCartData,
        serviceData,
        setServiceData,
        SSSFlag,
        setSSSFlag,
        serviceInCartFlag,
        setServiceInCartFlag,
        addToCart
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

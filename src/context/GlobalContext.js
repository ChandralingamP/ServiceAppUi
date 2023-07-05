import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData} from "./Storage";
import { get, post, remove, put } from "../services/WebServices";

const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const loginAuth = (token) => {
    setUserToken(token);
    AsyncStorage.setItem('userToken', token);
  }
  const logoutAuth = () => {
    setUserToken(null);
    setIsAdmin(false);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('admin');
  }
  const isLoggedIn = async () => {
    const data = await AsyncStorage.getItem('userToken');
    const admin = await AsyncStorage.getItem('admin');
    if (admin !== null) {
      setIsAdmin(true);
    }
    setUserToken(data);
  }
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
          `login/${customerPhoneNumber}/${customerPassword}`
        );
        if (data.msg) {
          saveData('userData',JSON.stringify(data.customerDetails));
          if (data?.admin) {
            AsyncStorage.setItem('admin', 'true');
            setIsAdmin(true);
          }
          loginAuth(customerPhoneNumber);
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
  const getOtp = async (phoneNumber) => {
    const data = await get('/otp/' + phoneNumber);
    if (data.msg) {
      AsyncStorage.setItem('otp', data.otp);
      console.log(data.otp);
      if (data.admin) {
        setIsAdmin(true);
        AsyncStorage.setItem('admin', 'true');
      }
      // setTimeout(() => {
      //   AsyncStorage.removeItem('otp');
      // }, 600000);
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
  const updateCustomerPassword = (password, navigation) => {
    const data = put(`customer/password`, { customerPassword: password });
    if (data.msg) {
      navigation.replace('LoginScreen');
    }
  }
  const verifyPassword = (password) => {
    if (password.length < 8 || password.length > 15) {
      Alert.alert("password length must be 8 to 15 character");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      Alert.alert("password contains at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      Alert.alert("password contains at least one lowercase letter");
      return false;
    }
    if (!/\d/.test(password)) {
      Alert.alert("password contains at least one digit");
      return false;
    }
    return true;
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
      if (serviceData.status == true) {
        console.log("true,");
        setServiceInCartFlag(true);
      } else {
        console.log("false");
        setServiceInCartFlag(false);
      }
      
      setServiceData(data);
      setSSSFlag(true);
    } catch (err) {
      console.log(err);
    }
  };

  // profile 


  // Cart
  const [cartData, setCartData] = useState();
  const navigateToCheckOut = (navigation) => {
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

  // Admin
  const updateAdminPassword = (password, navigation) => {
    const data = put(`admin/password`, { adminPassword: password });
    if (data.msg) {
      navigation.replace('LoginScreen');
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        userToken,
        logoutAuth,
        isLoggedIn,
        verifyPassword,
        customerPhoneNumber,
        isLogged,
        isAdmin,
        login,
        getOtp,
        setCustomerPhoneNumber,
        register,
        setIsLogged,
        otpVerify,
        updateCustomerDetails,
        updateCustomerPassword,
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
        addToCart,
        updateAdminPassword
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

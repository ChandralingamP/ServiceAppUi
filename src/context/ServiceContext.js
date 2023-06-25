import { createContext, useContext, useState } from "react";
import { saveData } from "./Storage";
import { get, post, remove, put } from "../services/WebServices";
const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [serviceData, setServiceData] = useState();

  const getServiceData = async () => {
    const data = await get("services/details");
    setServiceData(data);
  };
  const hi = "Hello ";
  return (
    <ServiceContext.Provider
      value={{
        hi,
        serviceData,
        setServiceData,
        getServiceData,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  return useContext(ServiceContext);
};

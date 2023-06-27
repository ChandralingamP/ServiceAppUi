import { createContext, useContext, useState } from "react";
import { saveData } from "./Storage";
import { get, post, remove, put } from "../services/WebServices";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    return (
        <AuthContext.Provider
            value={{
                userToken,
                loginAuth,
                logoutAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

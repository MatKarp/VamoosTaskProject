import React, { createContext, useState, useContext, useMemo } from "react";

const defaultData = {
  user_id: '',
  passcode: '',
}
const AuthContext = createContext(undefined);

type CredentialsType = {
  user_id: string;
  passcode: string;
};
export const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState<CredentialsType>(defaultData);

  const isAuthorized = useMemo(
    () => loginData.user_id === "VMD" && loginData.passcode == "VL1234",
    [loginData],
  );

  const login = ({ user_id, passcode }) => {
    if (user_id === "VMD" && passcode == "VL1234") {
      setLoginData({ user_id, passcode });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setLoginData(defaultData);
  };

  return (
    <AuthContext.Provider value={{ loginData, isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

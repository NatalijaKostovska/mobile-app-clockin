import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAdmin: false,
  });

  const setUser = (user) => {
    setAuthState((prev) => ({
      ...prev,
      user,
    }));
  };

  const setToken = (token) => {
    setAuthState((prev) => ({
      ...prev,
      token,
    }));
  };

  const setIsAdmin = (isAdmin) => {
    setAuthState((prev) => ({
      ...prev,
      isAdmin,
    }));
  };

  return (
    <AuthContext.Provider value={{ authState, setUser, setToken, setIsAdmin, setAuthState}}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
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

  return (
    <AuthContext.Provider
      value={{ authState, setUser, setToken, setAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

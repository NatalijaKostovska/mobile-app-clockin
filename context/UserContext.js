import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '../hooks/getUserData';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info
  const [loading, setLoading] = useState(true); // Tracks loading state

  const loadUser = async (userId) => {
    setLoading(true);
    try {
      const userData = await getUserData(userId);
      setUser(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <UserContext.Provider value={{ user, loading, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to access User Context
export const useUser = () => useContext(UserContext);

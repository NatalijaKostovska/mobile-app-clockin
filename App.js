import React, { StrictMode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

export default function App() {
  return ( 
      <AuthProvider>
         <UserProvider>
          <AppNavigator/>
         </UserProvider>
      </AuthProvider>

  ); 
}
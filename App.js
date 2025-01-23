import React, { StrictMode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AuthContext, AuthProvider } from './context/AuthContext';

export default function App() {
  return ( 
      <AuthProvider>
         <AppNavigator/>
      </AuthProvider>

  ); 
}
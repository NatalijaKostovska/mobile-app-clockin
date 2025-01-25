import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import NavigationMenu from '../NavigationMenu';
import { useUser } from '../../context/UserContext';
import Clock from '../../components/Clock';

const EmployeeDashboardScreen = () => {
    

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />  
      <View style={styles.clockView}>
        <Clock />
      </View>
      <NavigationMenu isAdmin={false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingHorizontal: 20,
  },
  clockView: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default EmployeeDashboardScreen;

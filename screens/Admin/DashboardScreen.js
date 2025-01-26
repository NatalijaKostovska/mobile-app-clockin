import { Button, Text, View } from 'react-native';
import React, { useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import NavigationMenu from '../NavigationMenu';
import Clock from '../../components/Clock';

const DashboardScreen = () => {
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />  
        <View style={styles.clockView}>
          <Clock />
        </View>
        <NavigationMenu isAdmin={false} />
      </SafeAreaView>
);
}

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
export default DashboardScreen;
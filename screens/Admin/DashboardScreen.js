import { View } from 'react-native';
import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import NavigationMenu from '../NavigationMenu';
import Clock from '../../components/Clock';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../components/Layout';

const DashboardScreen = () => {
  const { authState } = useContext(AuthContext);
  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <View style={styles.clockView}>
        <Clock />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  clockView: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default DashboardScreen;

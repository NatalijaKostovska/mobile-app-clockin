import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import NavigationMenu from '../screens/NavigationMenu';

const Layout = ({ children, isAdmin }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>{children}</View>
      <NavigationMenu isAdmin={isAdmin} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingBottom: 60, // Adjust this value based on the height of your NavigationMenu
  },
});

export default Layout;

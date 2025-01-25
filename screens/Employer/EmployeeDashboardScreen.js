import React from "react";
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import NavigationMenu from "../NavigationMenu";
import Clock from "../../components/Clock";

const EmployeeDashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.clockView}>
        <Clock />
      </View>
      <NavigationMenu isAdmin={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    paddingHorizontal: 20,
  },
  clockView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default EmployeeDashboardScreen;

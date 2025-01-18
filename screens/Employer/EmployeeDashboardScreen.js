import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationMenu from '../NavigationMenu';

const EmployeeDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clock In/Out</Text>
      <Text style={styles.time}>It's 3:45 PM</Text>

      <TouchableOpacity style={[styles.button, styles.primaryButton]}>
        <Text style={styles.buttonText}>Clock In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>Start Break</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>End Break</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.primaryButton]}>
        <Text style={styles.buttonText}>Clock Out</Text>
      </TouchableOpacity>

      <Text style={styles.warningText}>
        You're not scheduled to work. Are you sure you want to clock in?
      </Text>
      <NavigationMenu isAdmin={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  time: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#0066FF', // Blue button
  },
  secondaryButton: {
    backgroundColor: '#1E1E1E', // Dark gray button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    color: '#A0A0A0', // Light gray text
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  footerButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmployeeDashboardScreen;

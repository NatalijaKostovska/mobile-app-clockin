import { useNavigate } from 'react-router-native';
import { View, Text } from 'react-native';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationMenu from '../NavigationMenu';

const DashboardScreen = () => {

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerText}>Welcome, Admin 👋 
        </Text>
        <Text style={styles.headerText}>
          What would you like to do today?
        </Text>
        <NavigationMenu isAdmin={true} />
      </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  headerTitle: {
    fontSize: 28,
    padding: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 20,
    paddingVertical: 2,
    paddingHorizontal: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingVertical: 8,
    padding: 16,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  quickActions: {
    gap: 16,
    padding: 16,

  },
  quickActionsTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  tabBar: {
    backgroundColor: '#2C2C2E',
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: 8,
    height: 60,
  },
});
export default DashboardScreen;
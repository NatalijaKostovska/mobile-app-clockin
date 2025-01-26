import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavigationMenu from "../NavigationMenu";

const EmployeeEditScreen = ({ navigation }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    position: "Software Developer",
    startDate: "2023-01-15",
  });

  // Sample working hours data
  const monthlyHours = [
    { month: "January", hours: 168, overtime: 12 },
    { month: "February", hours: 160, overtime: 8 },
    { month: "March", hours: 176, overtime: 16 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Employee</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.name}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, name: text })
              }
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.email}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, email: text })
              }
              keyboardType="email-address"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.phone}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, phone: text })
              }
              keyboardType="phone-pad"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Position</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.position}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, position: text })
              }
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.startDate}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, startDate: text })
              }
              placeholderTextColor="#8F8F8F"
            />
          </View>
        </View>

        {/* Working Hours Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Hours</Text>

          {monthlyHours.map((month, index) => (
            <View key={index} style={styles.monthlyRecord}>
              <View style={styles.monthHeader}>
                <Text style={styles.monthName}>{month.month}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="create-outline" size={20} color="#007AFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.hoursContainer}>
                <View style={styles.hoursItem}>
                  <Text style={styles.hoursLabel}>Regular Hours</Text>
                  <Text style={styles.hoursValue}>{month.hours}h</Text>
                </View>
                <View style={styles.hoursItem}>
                  <Text style={styles.hoursLabel}>Overtime</Text>
                  <Text style={styles.hoursValue}>{month.overtime}h</Text>
                </View>
                <View style={styles.hoursItem}>
                  <Text style={styles.hoursLabel}>Total</Text>
                  <Text style={[styles.hoursValue, styles.totalHours]}>
                    {month.hours + month.overtime}h
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Menu */}
      <NavigationMenu isAdmin={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  scrollView: {
    flex: 1,
    marginBottom: 60, // Space for navigation menu
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#8E8E93",
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#2C2C2E",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
  monthlyRecord: {
    marginBottom: 20,
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    padding: 16,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  editButton: {
    padding: 4,
  },
  hoursContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hoursItem: {
    flex: 1,
  },
  hoursLabel: {
    color: "#8E8E93",
    fontSize: 12,
    marginBottom: 4,
  },
  hoursValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  totalHours: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EmployeeEditScreen;

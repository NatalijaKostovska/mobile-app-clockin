import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import moment from "moment";
import { handleTimeCalculation } from "../../hooks/handleTime";

const EmployeeTimeline = () => {
  const { authState } = useContext(AuthContext);
  const [employeeClocks, setEmployeeClocks] = useState([]);
  const [totalEmployeeHours, setTotalEmployeeHours] = useState(0);

  useEffect(() => {
    const fetchEmployeeClocks = async () => {
      const timeData = await handleTimeCalculation(authState.user.id, 1);

      setTotalEmployeeHours(timeData.totalHours);
      setEmployeeClocks(timeData.employeeClocks);
    };

    fetchEmployeeClocks();
  }, [authState.user.id]);

  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Working Timeline</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Hours</Text>
          <View style={styles.monthlyRecord}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthName}>January</Text>
            </View>
            <View style={styles.hoursContainer}>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursLabel}>Regular Hours</Text>
                <Text style={styles.hoursValue}>
                  {totalEmployeeHours > 40 ? 40 : totalEmployeeHours}h
                </Text>
              </View>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursLabel}>Overtime</Text>
                <Text style={styles.hoursValue}>
                  {totalEmployeeHours > 40 ? totalEmployeeHours - 40 : 0}h
                </Text>
              </View>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursLabel}>Total</Text>
                <Text style={[styles.hoursValue, styles.totalHours]}>
                  {totalEmployeeHours}h
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Hours</Text>
          <View style={styles.dailyRecord}>
            <Text style={styles.dailyDate}>Date</Text>
            <Text style={styles.dailyHours}>Hours</Text>
          </View>
          {employeeClocks.map((item, index) => (
            <View key={index} style={styles.dailyRecord}>
              <Text style={styles.dailyDate}>
                {moment(item.startTime.toDate()).format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.dailyHours}>
                {moment(item.endTime.toDate()).diff(
                  moment(item.startTime.toDate()),
                  "minutes"
                )}
                min
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
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
  disabled: {
    backgroundColor: "#1C1C1E",
    opacity: 0.5,
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
    justifyContent: "center",
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
  dailyRecord: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  dailyDate: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  dailyHours: {
    color: "#FFFFFF",
    fontSize: 16,
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

export default EmployeeTimeline;

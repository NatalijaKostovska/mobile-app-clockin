import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationMenu from '../NavigationMenu';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-native';
import { getItems, updateItem } from '../../firebase/firestoreUtils';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import moment from 'moment';

const EmployeeEditScreen = ({ navigation }) => {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [employee, setEmployee] = useState(null);
  const [employeeClocks, setEmployeeClocks] = useState([]);

  useEffect(() => {
    const fetchEmployeeClocks = async () => {
      const employeeClocks = await getItems('user-clocked', id);
      setEmployeeClocks(employeeClocks);
    };

    fetchEmployeeClocks();
  }, [id]);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeData = await getDoc(doc(db, 'users', id));
      setEmployee(employeeData.data());
    };
    fetchEmployee();
  }, [id]);

  const handleSave = () => {
    updateItem('users', id, {
      firstName: employee.firstName,
      lastName: employee.lastName,
      phoneNumber: employee.phoneNumber,
    });
  };

  const calculateTotalHours = (clocks) => {
    let totalHours = 0;

    clocks.forEach((clock) => {
      const startTime = moment(clock.startTime, 'M/D/YYYY, h:mm:ss A');
      const endTime = moment(clock.endTime, 'M/D/YYYY, h:mm:ss A');
      console.log(
        'start',
        startTime.format('h:mm:ss A'),
        'end',
        endTime.format('h:mm:ss A'),
        'diff',
        endTime.diff(startTime, 'seconds')
      );

      const differenceInHours = endTime.diff(startTime, 'hours', true);
      totalHours += differenceInHours;
      console.log('Total Hours:', totalHours);
    });

    return totalHours;
  };

  const getCurrentMonthDays = () => {
    const currentMonth = moment().month();
    const currentYear = moment().year();
    const daysInMonth = moment().daysInMonth();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = moment(
        `${currentYear}-${currentMonth + 1}-${day}`,
        'YYYY-M-D'
      );
      days.push({
        date: date.format('M/D/YYYY'),
        hours: calculateTotalHours(
          employeeClocks.filter((clock) =>
            moment(clock.startTime, 'M/D/YYYY, h:mm:ss A').isSame(date, 'day')
          )
        ),
      });
    }

    return days;
  };

  const daysInCurrentMonth = getCurrentMonthDays();

  const totalHours = calculateTotalHours(employeeClocks).toFixed(0);
  const overtime = totalHours > 40 ? totalHours - 40 : 0;

  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Employee</Text>
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
                <Text style={styles.hoursValue}>{totalHours}h</Text>
              </View>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursLabel}>Overtime</Text>
                <Text style={styles.hoursValue}>{overtime}h</Text>
              </View>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursLabel}>Total</Text>
                <Text style={[styles.hoursValue, styles.totalHours]}>
                  {Number(totalHours) + Number(overtime)}h
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
          {daysInCurrentMonth.map((day, index) => (
            <View key={index} style={styles.dailyRecord}>
              <Text style={styles.dailyDate}>{day.date}</Text>
              <Text style={styles.dailyHours}>{day.hours.toFixed(1)}h</Text>
            </View>
          ))}
        </View>
        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={employee?.firstName}
              onChangeText={(text) =>
                setEmployee({ ...employee, firstName: text })
              }
              placeholderTextColor="#8F8F8F"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={employee?.lastName}
              onChangeText={(text) =>
                setEmployee({ ...employee, lastName: text })
              }
              placeholderTextColor="#8F8F8F"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={employee?.phoneNumber}
              onChangeText={(text) =>
                setEmployee({ ...employee, phoneNumber: text })
              }
              keyboardType="phone-pad"
              placeholderTextColor="#8F8F8F"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabled]}
              value={employee?.email}
              onChangeText={(text) => setEmployee({ ...employee, email: text })}
              keyboardType="email-address"
              placeholderTextColor="#8F8F8F"
              editable={false}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60, // Space for navigation menu
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#8E8E93',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#1C1C1E',
    opacity: 0.5,
  },

  monthlyRecord: {
    marginBottom: 20,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    justifyContent: 'center',
  },
  editButton: {
    padding: 4,
  },
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hoursItem: {
    flex: 1,
  },
  hoursLabel: {
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 4,
  },
  hoursValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  totalHours: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  dailyRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  dailyDate: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dailyHours: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmployeeEditScreen;

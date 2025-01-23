import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigate } from 'react-router-native';

const ListOfEmployees = () => {
  const navigate = useNavigate();
  const employees = [
    { id: '1', name: 'Samantha S.', hours: '40 hours, 4 days' },
    { id: '2', name: 'Liam M.', hours: '20 hours, 5 days' },
    { id: '3', name: 'Sophia H.', hours: '30 hours, 4 days' },
    { id: '4', name: 'William R.', hours: '20 hours, 3 days' },
  ];

  const renderEmployee = ({ item }) => (
    <View style={styles.employeeRow}>
      <Image   source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
 style={styles.avatar} />
      <View style={styles.employeeInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.hours}>{item.hours}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="create-outline" size={24} color="#0066FF" onPress={() => navigate("/employee-edit")} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigate('/dashboard')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List of employees</Text>
      </View>
      {/* Employee list */}
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployee}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/add-new-employee')}
      >
        <Text style={styles.addButtonText}>Add new employee</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingTop: 40,
  },
  backButton: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#dedede',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  list: {
    paddingBottom: 100, // Space for the Add Employee button
  },
  employeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  employeeInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  hours: {
    fontSize: 14,
    color: '#A0A0A0', // Light gray text
  },
  editIcon: {
    fontSize: 20,
    color: '#0066FF', // Blue color for the edit icon
  },
  addButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListOfEmployees;

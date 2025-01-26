import React, { useContext, useEffect, useState } from 'react';
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
import { getItems } from '../../firebase/firestoreUtils';
import Layout from '../../components/Layout';
import { AuthContext } from '../../context/AuthContext';

const ListOfEmployees = () => {
  const { authState } = useContext(AuthContext);

  const [employeesList, setEmployeesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetUsers = async () => {
      const usersList = await getItems('users');
      setEmployeesList(usersList);
    };

    handleGetUsers();
  }, []);

  const renderEmployee = ({ item }) => (
    <View style={styles.employeeRow}>
      <Ionicons
        name="person-circle-outline"
        size={50}
        color="#999"
        style={styles.avatar}
      />
      <View style={styles.employeeInfo}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        {/* <Text style={styles.hours}>{5}</Text> */}
      </View>
      <TouchableOpacity>
        <Ionicons
          name="create-outline"
          size={24}
          color="#0066FF"
          onPress={() => navigate('/employee-edit/' + item.id)}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>List of employees</Text>
      </View>
      <FlatList
        data={employeesList}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployee}
        contentContainerStyle={styles.list}
      />
    </Layout>
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
    paddingBottom: 100,
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
    color: '#A0A0A0',
  },
  editIcon: {
    fontSize: 20,
    color: '#0066FF',
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

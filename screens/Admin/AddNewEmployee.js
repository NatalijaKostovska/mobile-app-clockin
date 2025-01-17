import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import { useNavigate } from 'react-router-native';

const AddNewEmployee = ( ) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const navigate = useNavigate();
  const handleSave = () => {
    console.log({ name, position, startingDate });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigate('/list-of-employees')} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add new employee</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#8F8F8F"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Position"
          placeholderTextColor="#8F8F8F"
          value={position}
          onChangeText={setPosition}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Starting date"
          placeholderTextColor="#8F8F8F"
          value={startingDate}
          onChangeText={setStartingDate}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  headerTitle: {
    color: '#dedede',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
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

export default AddNewEmployee;
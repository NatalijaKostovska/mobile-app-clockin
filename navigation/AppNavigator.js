import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import DashboardScreen from '../screens/Admin/DashboardScreen';
import ListOfEmployees from '../screens/Admin/ListOfEmployees';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import LoginScreen from '../screens/LoginScreen';
import EmployeeDashboardScreen from '../screens/Employer/EmployeeDashboardScreen';
import AddNewEmployee from '../screens/Admin/AddNewEmployee';
import EmployeeEditScreen from '../screens/Admin/EmployeeEditScreen';
import EmployeeTimeline from '../screens/Employer/EmployeeTimeline';

export default function AppNavigator() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
        <Route path="/list-of-employees" element={<ListOfEmployees />} />
        <Route path="/sign-up" element={<CreateAccountScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/employee-dashboard' element={<EmployeeDashboardScreen />} />
        <Route path='/add-new-employee' element={<AddNewEmployee />} />
        <Route path='/employee-edit' element={<EmployeeEditScreen />} />
        <Route path='/worked-timeline' element={<EmployeeTimeline />} />
      </Routes>
    </NativeRouter>
  );
}

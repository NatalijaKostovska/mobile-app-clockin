import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import DashboardScreen from '../screens/Admin/DashboardScreen';
import ListOfEmployees from '../screens/Admin/ListOfEmployees';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import LoginScreen from '../screens/LoginScreen';
import EmployeeDashboardScreen from '../screens/Employer/EmployeeDashboardScreen';
import EmployeeEditScreen from '../screens/Admin/EmployeeEditScreen';
import EmployeeTimeline from '../screens/Employer/EmployeeTimeline';
import { ProtectedRoute } from './ProtectedRoute';

export default function AppNavigator() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/sign-up" element={<CreateAccountScreen />} />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-of-employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ListOfEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-edit/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EmployeeEditScreen />
            </ProtectedRoute>
          }
        />

        {/* Protected Employee Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeDashboardScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worked-timeline"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeTimeline />
            </ProtectedRoute>
          }
        />
      </Routes>
    </NativeRouter>
  );
}

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';

  const NavigationMenu = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminNavItems = [
    { name: 'Dashboard', icon: 'home', path: '/' },
    { name: 'Team', icon: 'people', path: '/list-of-employees' },
    // { name: 'Time', icon: 'time', path: '/time-tracking' },
    { name: 'Export', icon: 'download', path: '/export' },
    { name: 'Logout', icon: 'log-out', path: '/logout' },
  ];

  const employeeNavItems = [
    { name: 'Dashboard', icon: 'home', path: '/employee-dashboard' },
    { name: 'Timeline', icon: 'calendar', path: '/worked-timeline' },
    { name: 'Logout', icon: 'log-out', path: '/logout' },
  ];

  const navItems = isAdmin ? adminNavItems : employeeNavItems;

  const handleNavigation = (path) => {
    if (path === '/login') {
        navigate('/login');
    }
    navigate(path);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => handleNavigation(item.path)}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={location.pathname === item.path ? '#FFFFFF' : '#8E8E93'}
          />
          <Text
            style={[
              styles.navText,
              {
                color: location.pathname === item.path ? '#FFFFFF' : '#8E8E93',
              },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    paddingVertical: 18,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default NavigationMenu;
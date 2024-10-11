import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { useAuth } from '../../navigation/RootNavigator';

const SettingsScreen = () => {
  const { setIsAuthenticated } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [language, setLanguage] = React.useState('English');

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const changeLanguage = () => {
    setLanguage(language === 'English' ? 'German' : 'English');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: () => setIsAuthenticated(false) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch 
          value={notificationsEnabled} 
          onValueChange={toggleNotifications} 
          trackColor={{ false: '#b39ddb', true: '#6a1b9a' }} // Purple track color
          thumbColor={notificationsEnabled ? '#8e44ad' : '#f3e5f5'} // Purple thumb color
        />
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={changeLanguage}>
        <Text style={styles.settingText}>Language</Text>
        <Text style={styles.settingValue}>{language}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.settingItem, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d1c4e9', // Light purple background
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f3e5f5', // Light purple background for items
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a1b9a', // Dark purple text color
  },
  settingValue: {
    fontSize: 16,
    color: '#8e44ad', // Purple text color
  },
  logoutButton: {
    backgroundColor: '#d32f2f', // Red button for logout
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

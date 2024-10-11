import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactInfoScreen = ({ route }) => {
  const { userName } = route.params;
  
  // Dummy data for demonstration
  const contactInfo = {
    name: userName,
    phone: '+6281360457685',
    profilePicture: 'https://via.placeholder.com/150',
    language: 'German',
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDeleteMessages = () => {
    Alert.alert('Delete All Messages', 'Are you sure you want to delete all messages?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => Alert.alert('Messages Deleted') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: contactInfo.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.name}>{contactInfo.name}</Text>
        <Text style={styles.phone}>{contactInfo.phone}</Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={handleDeleteMessages}>
          <Ionicons name="trash-outline" size={24} color="#2f95dc" />
          <Text style={styles.settingText}>Delete all messages</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Ionicons name="globe-outline" size={24} color="#2f95dc" />
          <Text style={styles.settingText}>Sender language</Text>
          <Text style={styles.settingValue}>{contactInfo.language}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
    backgroundColor: '#8e44ad',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 40,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  phone: {
    fontSize: 16,
    color: '#fff',
  },
  settingsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
  },
  settingText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  settingValue: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ContactInfoScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ProfileScreen = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    if (newName.trim() === '' || newEmail.trim() === '') {
      Alert.alert('Error', 'Name and email cannot be empty.');
      return;
    }

    setUser({ ...user, name: newName, email: newEmail });
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your profile information has been updated.');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d1c4e9', // Light purple background
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#8e44ad', // Dark purple border
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a1b9a', // Purple text color
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#8e44ad', // Purple text color
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f3e5f5', // Light purple input background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8e44ad', // Dark purple border
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#6a1b9a', // Dark purple button
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#d32f2f', // Red button for cancel
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#6a1b9a', // Dark purple button
    padding: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;

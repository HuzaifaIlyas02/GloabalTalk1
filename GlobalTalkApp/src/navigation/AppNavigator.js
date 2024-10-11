import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatListScreen from '../screens/Main/ChatListScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import ChatScreen from '../screens/Main/ChatScreen';
import ContactInfoScreen from '../screens/Main/ContactInfoScreen';
import AddContactScreen from '../screens/Main/AddContactScreen';


const Tab = createBottomTabNavigator();
const ChatStack = createStackNavigator();

const ChatStackNavigator = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: true }}>
    <ChatStack.Screen
      name="ChatList"
      component={ChatListScreen}
      options={{ title: 'Chats' }}
    />
    <ChatStack.Screen 
      name="Chat" 
      component={ChatScreen}
      options={({ route }) => ({ title: route.params.userName })}
    />
    <ChatStack.Screen 
      name="Contact Info" 
      component={ContactInfoScreen}
      options={{ title: 'Contact Info' }}
    />
    <ChatStack.Screen
  name="Add Contact"
  component={AddContactScreen}
  options={{ title: 'Add Contact' }}
    />
  </ChatStack.Navigator>
  
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Chats') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Chats" 
        component={ChatStackNavigator}
        options={{ headerShown: false }} // Header is managed in the stack navigator
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }} // Add a header title for the Profile screen
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }} // Add a header title for the Settings screen
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

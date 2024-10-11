import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LanguageSelectionScreen from '../screens/Auth/LanguageSelectionScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LanguageSelection"
      screenOptions={{ headerShown: false }} // Hides the header for all screens
    >
      <Stack.Screen 
        name="LanguageSelection" 
        component={LanguageSelectionScreen}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

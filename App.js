import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    <>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      <Toast />
      <StatusBar style="light" />
    </>
  );
}
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Resumo from './src/screens/resumo';


export default function Stack() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="resumo"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="resumo" component={Resumo} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Perfil from './src/screens/perfil';
import Topicos from './src/screens/topicos';
import Login from './src/screens/login';


export default function Stack() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="perfil"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="perfil" component={Perfil} />
        <AuthStack.Screen name="login" component={Login} />
        <AuthStack.Screen name="Topicos" component={Topicos} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

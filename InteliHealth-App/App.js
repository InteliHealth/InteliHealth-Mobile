import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import {Home} from './src/screens/home';
import {Login} from './src/screens/login';
import Perfil from './src/screens/perfil'
import Lembretes from './src/screens/lembretes';


export default function Stack() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="Perfil"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="Perfil" component={Perfil} />
        <AuthStack.Screen name="Lembretes" component={Lembretes} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

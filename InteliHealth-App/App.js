import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import {Home} from './src/screens/home';
import {Login} from './src/screens/login';
import Resumo from './src/screens/resumo';


export default function Stack() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="Pefil" component={Perfil} />
        <AuthStack.Screen name="Resumo" component={Resumo} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Login } from '../screens';

export type AuthStackParams = {
  Login: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export type AuthNavigatorProp = NativeStackNavigationProp<AuthStackParams, 'Login'>;

export const AuthNavigator = () => {
  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // header: ({ navigation }) => <Header onBack={() => navigation.goBack()} />,
        }}
      />
    </Navigator>
  );
};

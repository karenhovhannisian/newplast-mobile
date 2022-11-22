import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../store';
import { getIsLoggedIn } from '../store/auth/selectors';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export const AppNavigation = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  return (
    <NavigationContainer>{!isLoggedIn ? <AuthNavigator /> : <MainNavigator />}</NavigationContainer>
  );
};

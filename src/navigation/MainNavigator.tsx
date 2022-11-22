import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { default as BackIcon } from '../assets/images/Back.svg';
import BasketIcon from '../assets/images/basketTransparent.png';
import ThreeDot from '../assets/images/threeDot.png';
import { HeaderButton } from '../components';
import { Basket, Home, OrderHistory, Products, SuccessScreen } from '../screens';
import { useAppDispatch, useAppSelector } from '../store';
import { attemptLogOutSuccess } from '../store/auth/slice';
import { getBasket } from '../store/basket/selectors';
import { TabNavigation } from './TabNavigation';

export type MainStackParams = {
  Home: undefined;
  TabNavigation: { screen: 'PreviousOrder' | 'CreateOrder' | 'Debts' | 'Orders' };
  Basket: undefined;
  OrderHistory: { orderCode: string };
  Products: undefined;
  SuccessScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<MainStackParams>();

export type MainNavigatorProp = NativeStackNavigationProp<MainStackParams, 'Home'>;

export const MainNavigator = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(getBasket);
  const changeModalState = useCallback(() => {
    dispatch(attemptLogOutSuccess());
  }, [dispatch]);

  const basketItemCount = useMemo(
    () => basket.reduce((acc, curr) => acc + curr.apr_cank.length, 0),
    [basket],
  );

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: '700' },

        headerLeft: () => (
          <TouchableOpacity
            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
            onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        ),
        headerRight: () => <HeaderButton onPress={changeModalState} image={ThreeDot} />,
      })}>
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          // header: ({ navigation }) => <Header onBack={() => navigation.goBack()} />,
        }}
      />
      <Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: '#ffffff' },

          // header: ({ navigation }) => <Header onBack={() => navigation.goBack()} />,
        }}
      />
      <Screen
        name="Basket"
        component={Basket}
        options={{ headerTitle: 'Ընտրված Ապրանքներ', contentStyle: { backgroundColor: '#ffffff' } }}
      />
      <Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ contentStyle: { backgroundColor: '#ffffff' }, headerShown: false }}
      />
      <Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          headerTitle: 'Պատվերի պատմություն',
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      />
      <Screen
        name="Products"
        component={Products}
        options={({ navigation }) => ({
          headerTitle: 'Ապրանքներ',
          contentStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <>
              <HeaderButton
                onPress={() => navigation.navigate('Basket')}
                image={BasketIcon}
                badge={basketItemCount}
              />
              <HeaderButton onPress={changeModalState} image={ThreeDot} />
            </>
          ),
        })}
      />
    </Navigator>
  );
};

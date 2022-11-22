import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AddOrderTab from '../assets/images/AddOrderTab.png';
import { default as BackIcon } from '../assets/images/Back.svg';
import DebtsTab from '../assets/images/DebtsTab.png';
import OrdersTab from '../assets/images/OrderTab.png';
import PreviousOrdersTab from '../assets/images/PreviousOrdersTab.png';
import ThreeDot from '../assets/images/threeDot.png';
import { HeaderButton, TabIcon } from '../components';
import { Debts, PreviousOrder } from '../screens';
import { Customers } from '../screens/Customers/Customers';
import { Orders } from '../screens/Orders/Orders';
import { useAppDispatch } from '../store';
import { attemptLogOutSuccess } from '../store/auth/slice';
import { horizontalScale, verticalScale } from '../utils/scale';
import { MainNavigatorProp, MainStackParams } from './MainNavigator';

export type MainTabParams = {
  PreviousOrder: undefined;
  CreateOrder: undefined;
  Debts: undefined;
  Orders: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<MainTabParams>();

export const TabNavigation = () => {
  const dispatch = useAppDispatch();
  const router = useRoute<RouteProp<MainStackParams, 'TabNavigation'>>();
  const navigation = useNavigation<MainNavigatorProp>();

  //   const user = useAppSelector(getUser);
  //   const insets = useSafeAreaInsets();
  //   const newMessages = useAppSelector(getNewMessages);
  //   const notificationCount = useAppSelector(getNotificationCount);
  //   const navigation = useNavigation<MainNavigationProps>();

  const changeModalState = useCallback(() => {
    dispatch(attemptLogOutSuccess());
  }, [dispatch]);

  return (
    <Navigator
      initialRouteName={router.params.screen || 'CreateOrder'}
      screenOptions={{
        tabBarStyle: {
          // position: 'absolute',
          // bottom: verticalScale(10),
          // left: horizontalScale(20),
          // right: horizontalScale(20),
          height: verticalScale(94),
          // borderRadius: moderateScale(120),
          backgroundColor: '#00276E',
          paddingVertical: verticalScale(8),
          paddingHorizontal: horizontalScale(120),
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        tabBarItemStyle: {
          maxWidth: 240,
        },

        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: '700' },
        headerLeftContainerStyle: { paddingLeft: horizontalScale(20) },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <BackIcon />
          </TouchableOpacity>
        ),
        headerRight: () => <HeaderButton onPress={changeModalState} image={ThreeDot} />,
      }}>
      <Screen
        name="PreviousOrder"
        component={PreviousOrder}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={PreviousOrdersTab} focused={focused} title="Նախկին պատվերներ" />
          ),
          headerTitle: 'Նախկին պատվերներ',
        }}
      />
      <Screen
        name="CreateOrder"
        component={Customers}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={AddOrderTab} focused={focused} title="Ստեղծել պատվեր" />
          ),
          headerRight: () => (
            <>
              <HeaderButton onPress={changeModalState} image={ThreeDot} />
              {/* <HeaderButton onPress={navigateToBasket} image={BasketIcon} badge={basket?.length} /> */}
            </>
          ),
          headerRightContainerStyle: { flexDirection: 'row-reverse', justifyContent: 'flex-start' },
          headerTitle: 'Ստեղծել պատվեր',
        }}
      />
      <Screen
        name="Debts"
        component={Debts}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon={DebtsTab} focused={focused} title="Պարտք" />,
          headerTitle: 'Պարտք',
        }}
      />
      <Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={OrdersTab} focused={focused} title="Չավարտված պատվերներ" />
          ),

          headerTitle: 'Չավարտված պատվերներ',
        }}
      />
    </Navigator>
  );
};

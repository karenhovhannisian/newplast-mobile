import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BasketBottom, EmptyBasket, Text } from '../../components';
import DropDown from '../../components/DropDown';
import { UpdateBasketFetchedData } from '../../models/orders';
import BasketTabsNavigator from '../../navigation/BasketTabNavigator';
import { MainNavigatorProp } from '../../navigation/MainNavigator';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getActiveOrderId,
  getBasket,
  getDescription,
  getManagers,
} from '../../store/basket/selectors';
import { confirmOrder, getManagersList, updateOrderList } from '../../store/basket/thunks';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const Basket = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainNavigatorProp>();
  const basket = useAppSelector(getBasket);
  const managers = useAppSelector(getManagers);
  const activeOrderId = useAppSelector(getActiveOrderId);
  const description = useAppSelector(getDescription);

  const managersList = useMemo(
    () => managers.map(manager => ({ label: manager.men, value: manager.men, id: manager.codn })),
    [managers],
  );

  const [selectedManager, setSelectedManager] = useState<string>('');

  useEffect(() => {
    (async () => {
      dispatch(getManagersList());
    })();
  }, [dispatch]);

  const onSubmit = useCallback(async () => {
    const patCodes = basket.map(item => item.patcod).join(',');
    const updateManagerData = basket.map<UpdateBasketFetchedData>(item => ({
      id: item.id,
      men: selectedManager,
      spdit: description,
      aah: item.aah || '',
    }));

    if (activeOrderId) {
      await dispatch(updateOrderList({ body: updateManagerData, orderId: activeOrderId }));
      await dispatch(confirmOrder({ patCodes, orderId: activeOrderId }));
      navigation.push('SuccessScreen');
    }
  }, [activeOrderId, basket, description, dispatch, navigation, selectedManager]);

  const hasItem = useMemo(
    () =>
      basket
        .reduce<Array<boolean>>((acc, curr) => [...acc, !!curr.apr_cank.length], [])
        .includes(true),
    [basket],
  );
  const onManagerChange = useCallback((value: any) => {
    setSelectedManager(value.id);
  }, []);
  return (
    <Pressable style={styles.base} onPress={() => Keyboard.dismiss()}>
      {!hasItem ? (
        <EmptyBasket />
      ) : (
        <>
          <View style={styles.config}>
            <Text numberOfLines={1} fontSize={20} style={styles.customerName}>
              {basket[0].gyanun}
            </Text>
            <View>
              <DropDown
                items={managersList}
                size={moderateScale(350)}
                placeholder={'Ընտրել Մենեջեր'}
                onChange={onManagerChange}
              />
            </View>
          </View>
          <BasketTabsNavigator />
          <BasketBottom hasSelectedManager={!!selectedManager} onSubmit={onSubmit} />
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: horizontalScale(72),
    paddingVertical: verticalScale(36),
    justifyContent: 'center',
    backgroundColor: '#f7f7f9',
  },
  config: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },

  customerName: {
    fontWeight: '700',
    flex: 1,
    paddingRight: horizontalScale(24),
  },
});

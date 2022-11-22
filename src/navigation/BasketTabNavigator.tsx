import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BasketListItem } from '../components';
import { IBasketProduct } from '../models/product';
import { useAppSelector } from '../store';
import { getBasket } from '../store/basket/selectors';
import { moderateScale, verticalScale } from '../utils/scale';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const BasketTabsNavigator = () => {
  const basket = useAppSelector(getBasket);

  const renderItem = useCallback(
    (item: IBasketProduct, typeId: number) => <BasketListItem item={item} typeId={typeId} />,
    [],
  );
  const Divider = useCallback(() => <View style={styles.divider} />, []);
  const keyExtractor = useCallback((item: IBasketProduct) => item.lid.toString(), []);

  const renderChildren = useCallback(
    (tab: string, id: number) => {
      const data = basket.find(i => i.aah === tab)?.apr_cank || [];

      return (
        <Pressable style={{ height: '100%' }}>
          <FlatList
            data={data}
            scrollEventThrottle={16}
            renderItem={({ item }) => renderItem(item, id)}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={Divider}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={6}
            initialNumToRender={4}
          />
        </Pressable>
      );
    },
    [Divider, basket, keyExtractor, renderItem],
  );

  return (
    <Navigator screenOptions={{ swipeEnabled: true }}>
      {basket.map(tab => {
        return tab.apr_cank.length ? (
          <Screen key={tab.id} name={tab.aah || ''}>
            {() => renderChildren(tab.aah || '', tab.id)}
          </Screen>
        ) : null;
      })}
    </Navigator>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: verticalScale(10),
    backgroundColor: '#f7f7f9',
  },
  divider: {
    height: moderateScale(16),
  },
});

export default BasketTabsNavigator;

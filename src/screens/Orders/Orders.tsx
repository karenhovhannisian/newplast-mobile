import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, VirtualizedList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TableItem } from '../../components';
import { DeleteOrderFetchedData } from '../../models/orders';
import { MainNavigatorProp } from '../../navigation/MainNavigator';
import { useAppDispatch, useAppSelector } from '../../store';
import { initializeBasket, setCustomerId } from '../../store/basket/slice';
import { getOrdersSelector } from '../../store/orders/selectors';
import { INotFinishedOrder } from '../../store/orders/slice';
import { deleteOrder } from '../../store/orders/thunks';
import { orderTableColumns } from '../../utils/constants';
import { horizontalScale, verticalScale } from '../../utils/scale';

export const Orders = () => {
  const orders = useAppSelector(getOrdersSelector);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainNavigatorProp>();

  const Header = useMemo(
    () => <TableItem id={'-1'} isHeader={true} items={orderTableColumns} />,
    [],
  );

  const handleOrderDelete = useCallback(
    (item: INotFinishedOrder) => {
      const data: Array<DeleteOrderFetchedData> = item.data.map(i => ({
        id: -i.id,
        aah: i.aah || '',
      }));
      dispatch(deleteOrder({ orderId: item.id, body: data }));
    },
    [dispatch],
  );

  const keyExtractor = useCallback((item: INotFinishedOrder) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item, index }: { item: INotFinishedOrder; index: number }) => {
      const finalPrice = item.data
        .reduce((acc, curr) => acc + Number((curr.sgumar || 0) - (curr.szgumar || 0)), 0)
        .toFixed(2);
      const date = new Date(item.id);

      return (
        <TableItem
          id={item.id}
          items={[
            (index + 1).toString(),
            item.data[0]?.gyanun || '',
            date.toISOString().slice(0, 10),
            finalPrice,
            '',
          ]}
          onPress={() => {
            dispatch(initializeBasket({ activeOrderId: item.id, basket: item.data }));
            dispatch(setCustomerId(item.data[0].gycod?.toString() || ''));
            navigation.navigate('Products');
          }}
          buttonTitle="Ջնջել"
          onButtonPress={() => handleOrderDelete(item)}
        />
      );
    },
    [dispatch, handleOrderDelete, navigation],
  );

  const getItemCount = useCallback(() => orders.length, [orders.length]);
  const getItem = useCallback((_: any, index: number) => orders[index], [orders]);

  return (
    <View style={styles.base}>
      <VirtualizedList
        data={[]}
        style={styles.list}
        ListHeaderComponent={Header}
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        initialNumToRender={5}
      />
      {/* <VirtualizedList
        data={[]}
        style={styles.list}
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={12}
        initialNumToRender={2}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(60),
  },
  footer: {
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSection: {
    flexDirection: 'row',
    minWidth: horizontalScale(200),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  searchInput: {
    flex: 0.5,
  },
  list: {},
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

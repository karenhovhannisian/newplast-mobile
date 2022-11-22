import React, { memo, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TableItem, Text } from '../../components';
import { MainStackParams } from '../../navigation/MainNavigator';
import { useAppSelector } from '../../store';
import { getOldOrdersSelector } from '../../store/oldOrders/selectors';
import { orderHistoryTableColumns } from '../../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const OrderHistory = memo(() => {
  const route = useRoute<RouteProp<MainStackParams, 'OrderHistory'>>();
  const oldOrders = useAppSelector(getOldOrdersSelector);

  const singleOrder = useMemo(
    () => oldOrders.find(order => order.patcod === route.params.orderCode),
    [oldOrders, route.params.orderCode],
  );

  const tableData = useMemo(
    () =>
      singleOrder?.apr_cank?.map((item, index) => {
        return {
          id: item.lid,
          data: [index + 1, item.apranun, item.psize, item.qanak, item.gumar],
        };
      }),
    [singleOrder?.apr_cank],
  );

  const topTableData = useMemo(
    () => [
      ['Հաճախորդի անուն', `${singleOrder?.gyanun}`, ''],
      ['Կոդ', `${singleOrder?.gycod}`, ''],
      ['Տիպ', `${singleOrder?.aah}`, ''],
      ['Ընդհանուր գին', `${singleOrder?.sgumar} դրամ`, ''],
      ['Զեղչված գին', `${singleOrder?.szgumar ? singleOrder?.szgumar + ' դրամ' : ' '} `, ''],
    ],
    [
      singleOrder?.aah,
      singleOrder?.gyanun,
      singleOrder?.gycod,
      singleOrder?.sgumar,
      singleOrder?.szgumar,
    ],
  );

  return (
    <ScrollView contentContainerStyle={styles.base}>
      <View style={styles.tableHeader}>
        <Text fontSize={20} style={styles.headerTitle}>
          Պատվերի կոդ՝ {route.params.orderCode}
        </Text>
        <Text fontSize={20} style={styles.headerTitle}>
          {singleOrder?.sdate}
        </Text>
      </View>
      <View style={styles.tableBody}>
        {topTableData.map((date, index) => (
          <>
            <View key={index.toString()} style={styles.tableItem}>
              <Text fontSize={20} style={styles.tableItemTitle}>
                {date[0]}
              </Text>
              <Text fontSize={20} style={styles.tableItemValue}>
                {date[1]}
              </Text>
            </View>
            {index !== topTableData.length - 1 && <View style={styles.divider} />}
          </>
        ))}
      </View>
      <Text fontSize={22} style={styles.boughtItemsCount}>
        {tableData?.length} պատվեր
      </Text>
      <TableItem key={'-1'} id={'-1'} isHeader={true} items={orderHistoryTableColumns} />
      {tableData?.map(item => (
        <TableItem key={item.id} id={item.id} items={item.data} />
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: horizontalScale(92),
    paddingVertical: verticalScale(48),
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#00276E',
    height: moderateScale(72),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(36),
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: '700',
  },
  tableBody: {
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(36),
    paddingVertical: verticalScale(24),
    backgroundColor: '#ffffff',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 25,
  },
  tableItem: {
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
  },
  tableItemTitle: {
    flex: 1,
    color: '#00276E',
    fontWeight: '700',
  },
  tableItemValue: {
    flex: 1,
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  boughtItemsCount: {
    fontWeight: '600',
    paddingVertical: verticalScale(24),
  },
});

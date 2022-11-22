import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import Close from '../../assets/images/close.svg';
import SearchIcon from '../../assets/images/search.png';
import { TableItem, Text, TextInput } from '../../components';
import { MainNavigatorProp } from '../../navigation/MainNavigator';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getLoaderOldOrders,
  getLoaderOldOrdersWithPagination,
  getOldOrdersSelector,
} from '../../store/oldOrders/selectors';
import { getNextOrders } from '../../store/oldOrders/slice';
import { getOldOrders } from '../../store/oldOrders/thunks';
import {
  INITIAL_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE,
  oldOrdersTableColumns,
} from '../../utils/constants';
import { useDebounce } from '../../utils/debaunce';
import { getDate } from '../../utils/helpers';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const PreviousOrder = () => {
  const list = useRef<VirtualizedList<any>>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainNavigatorProp>();
  const oldOrders = useAppSelector(getOldOrdersSelector);
  const oldOrdersToRender = useAppSelector(getLoaderOldOrdersWithPagination);
  const loaderOldOrders = useAppSelector(getLoaderOldOrders);
  const [searchValue, setSearchedValue] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  // const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] =
  //   useState<boolean>(true);

  const debText = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debText || startDate || endDate) {
      dispatch(
        getNextOrders({
          pagination: { offset: 0, limit: ITEMS_PER_PAGE },
          filters: {
            search: debText,
            startDate: startDate && JSON.stringify(startDate),
            endDate: JSON.stringify(endDate),
          },
        }),
      );
    } else {
      dispatch(
        getNextOrders({
          pagination: { offset: 0, limit: ITEMS_PER_PAGE },
          filters: {},
        }),
      );
    }
  }, [debText, dispatch, endDate, startDate]);

  useEffect(() => {
    dispatch(getOldOrders());
  }, [dispatch]);

  const tableData = useMemo(
    () =>
      oldOrdersToRender.map((item, index) => ({
        id: item.id,
        status: !!item.pstatus,
        data: [index + 1, item.gyanun, item.gycod, item.sdate, item.patcod, ' '],
      })),
    [oldOrdersToRender],
  );

  const onSetStartDate = useCallback(() => {
    DateTimePickerAndroid.open({
      maximumDate: endDate,
      value: startDate || endDate,
      onChange: (event, date) => {
        if (event.type === 'set') {
          date && setStartDate(date);
        }
      },
    });
  }, [endDate, startDate]);

  const onSetEndDate = useCallback(() => {
    DateTimePickerAndroid.open({
      minimumDate: startDate,
      maximumDate: new Date(),
      value: endDate,
      onChange: (event, date) => {
        if (event.type === 'set') {
          date && setEndDate(date);
        }
      },
    });
  }, [endDate, startDate]);

  const clearDateFilter = useCallback(() => {
    setEndDate(new Date());
    setStartDate(undefined);
  }, []);

  // List callbacks
  const Header = useMemo(
    () => <TableItem id={'-1'} isHeader={true} items={oldOrdersTableColumns} />,
    [],
  );
  const Footer = useMemo(() => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator size={moderateScale(50)} color={'#01276e'} />
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: any) => (
      <TableItem
        id={item.id}
        status={item.status}
        items={item.data}
        buttonTitle={'Տեսնել ավելին'}
        onButtonPress={() => navigation.push('OrderHistory', { orderCode: item.data[4] })}
      />
    ),
    [navigation],
  );
  const keyExtractor = useCallback((item: any) => item.data[4], []);
  const onEndReached = useCallback(() => {
    dispatch(
      getNextOrders({
        pagination: { offset: oldOrdersToRender.length, limit: ITEMS_PER_PAGE },
        filters: {
          search: searchValue,
          startDate: startDate && JSON.stringify(startDate),
          endDate: JSON.stringify(endDate),
        },
      }),
    );
  }, [dispatch, endDate, oldOrdersToRender.length, searchValue, startDate]);

  const getItemCount = useCallback(() => tableData.length, [tableData.length]);
  const getItem = useCallback((_: any, index: number) => tableData[index], [tableData]);

  useScrollToTop(list);

  return !loaderOldOrders ? (
    <View style={styles.base}>
      <View style={styles.filterSection}>
        <TextInput
          placeholder="Որոնել"
          icon={SearchIcon}
          onChangeText={setSearchedValue}
          value={searchValue}
          style={styles.input}
        />
        <View style={styles.filters}>
          <TouchableOpacity onPress={onSetEndDate} style={[styles.dateButton, styles.endDate]}>
            <Text fontSize={16} style={styles.buttonTitle}>
              Մինչև {getDate(endDate)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSetStartDate} style={styles.dateButton}>
            <Text fontSize={16} style={styles.buttonTitle}>
              Սկսած {startDate ? getDate(startDate) : '--/--/----'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={clearDateFilter}>
            <Close />
          </TouchableOpacity>
        </View>
      </View>
      <VirtualizedList
        ref={list}
        data={[]}
        style={styles.list}
        ListHeaderComponent={Header}
        ListFooterComponent={
          oldOrders.length !== oldOrdersToRender.length &&
          oldOrdersToRender.length >= INITIAL_ITEMS_PER_PAGE
            ? Footer
            : undefined
        }
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={10}
        initialNumToRender={5}
      />
    </View>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size={moderateScale(70)} color={'#01276e'} />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(40),
    paddingVertical: verticalScale(40),
  },
  filters: {
    flex: 2,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(40),
  },
  input: {
    width: 200,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {},
  dateButton: {
    flexDirection: 'row',
    backgroundColor: '#d2d8e6',
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },

  endDate: {
    marginLeft: horizontalScale(20),
    backgroundColor: '#d2d8e6',
  },
  buttonTitle: {
    color: '#00276E',
    fontWeight: '700',
  },
  cancel: {
    paddingRight: horizontalScale(20),
  },
});

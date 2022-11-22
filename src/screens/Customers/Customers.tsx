import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View, VirtualizedList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import SearchIcon from '../../assets/images/search.png';
import { CustomerListItem, TextInput } from '../../components';
import DropDown from '../../components/DropDown';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getCustomers,
  getCustomersRequestLoading,
  getCustomersToRender,
} from '../../store/basket/selectors';
import { getNextCustomer } from '../../store/basket/slice';
import { getCustomersList } from '../../store/basket/thunks';
import { INITIAL_ITEMS_PER_PAGE, ITEMS_PER_PAGE } from '../../utils/constants';
import { useDebounce } from '../../utils/debaunce';
import { groupBy } from '../../utils/helpers';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const Customers = () => {
  const list = useRef<VirtualizedList<any>>(null);
  const dispatch = useAppDispatch();
  const customers = useAppSelector(getCustomers);
  const customersToRender = useAppSelector(getCustomersToRender);
  const loading = useAppSelector(getCustomersRequestLoading);
  const [searchValue, setSearchedValue] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (!customers.length) {
      dispatch(getCustomersList());
    }
  }, [customers.length, dispatch]);

  const debText = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(
      getNextCustomer({
        pagination: { offset: 0, limit: INITIAL_ITEMS_PER_PAGE },
        filters: {
          search: debText,
          region: region,
        },
      }),
    );
  }, [debText, dispatch, region]);

  const grouped = useMemo(
    () => groupBy(customers, customer => (customer.aktrg ? customer.aktrg.trim() : '')),
    [customers],
  );

  const regions = useMemo(
    () => [...grouped.keys()].map(i => ({ label: i || '', value: i })),
    [grouped],
  );
  const onDropDownChanged = useCallback((value: any) => {
    setRegion(value.value);
    list.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  const tableData = useMemo(
    () =>
      customersToRender.map(item => ({
        id: item.fCODE,
        name: item.anun,
        address: item.hacse,
        debt: item.partq,
        discount: item.zexch,
      })),
    [customersToRender],
  );

  const Footer = useMemo(() => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator size={moderateScale(50)} color={'#01276e'} />
      </View>
    );
  }, []);

  const renderItem = useCallback(({ item }: any) => <CustomerListItem {...item} />, []);

  const onEndReached = useCallback(() => {
    dispatch(
      getNextCustomer({
        pagination: { offset: customersToRender.length, limit: ITEMS_PER_PAGE },
        filters: {
          search: searchValue,
          region: region,
        },
      }),
    );
  }, [customersToRender.length, dispatch, region, searchValue]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getCustomersList());
    setRefreshing(false);
  }, [dispatch]);

  const keyExtractor = useCallback((item: any) => item.id, []);
  const getItemCount = useCallback(() => tableData.length, [tableData.length]);
  const getItem = useCallback((_: any, index: number) => tableData[index], [tableData]);
  const StickyHeaderComponent = useCallback(
    () => (
      <CustomerListItem
        id={'-1'}
        name="Անուն"
        address="Հասցե"
        debt="Պարտք"
        discount="Զեղչ"
        isHeader={true}
      />
    ),
    [],
  );

  useScrollToTop(list);

  return loading && !refreshing ? (
    <View style={styles.loading}>
      <ActivityIndicator size={moderateScale(70)} color={'#01276e'} />
    </View>
  ) : (
    <View style={styles.root}>
      <View style={styles.filterSection}>
        <TextInput
          placeholder="Որոնել"
          icon={SearchIcon}
          onChangeText={setSearchedValue}
          value={searchValue}
          wrapperStyle={styles.searchInput}
        />
        <View>
          <DropDown
            placeholder="Տարածաշրջան"
            items={regions}
            onChange={onDropDownChanged}
            size={moderateScale(300)}
          />
        </View>
      </View>
      <VirtualizedList
        ref={list}
        data={[]}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ee3036" />
        }
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={StickyHeaderComponent}
        ListFooterComponent={
          customers.length !== customersToRender.length &&
          customersToRender.length >= INITIAL_ITEMS_PER_PAGE
            ? Footer
            : undefined
        }
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={null}
        maxToRenderPerBatch={12}
        initialNumToRender={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: horizontalScale(60),
    backgroundColor: 'lightGray',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#1345B5',
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
    zIndex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    // flex: 1,
    width: 200,
  },
  list: {},
  footer: {
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, VirtualizedList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import SearchIcon from '../../assets/images/search.png';
import { TableItem, TextInput } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getDebtsListSelector,
  getDebtsToRender,
  getLoaderDebtList,
} from '../../store/debts/selectors';
import { getNextDebts } from '../../store/debts/slice';
import { getDebtList } from '../../store/debts/thunks';
import { debtsTableColumns } from '../../utils/constants';
import { useDebounce } from '../../utils/debaunce';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const Debts = () => {
  const list = useRef<VirtualizedList<any>>(null);
  const dispatch = useAppDispatch();
  const debtsList = useAppSelector(getDebtsListSelector);
  const debtsToRender = useAppSelector(getDebtsToRender);
  const loaderDebtsList = useAppSelector(getLoaderDebtList);
  const [searchValue, setSearchedValue] = useState<string>('');

  useEffect(() => {
    if (!debtsList.length) {
      dispatch(getDebtList());
    }
  }, [debtsList.length, dispatch]);
  const debText = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(
      getNextDebts({
        pagination: { offset: 0, limit: 30 },
        filters: {
          search: debText,
        },
      }),
    );
  }, [debText, dispatch]);

  const tableData = useMemo(
    () =>
      debtsToRender.map((item, index) => ({
        id: item.fCODE,
        data: [index + 1, item.anun, item.hacse, item.fCODE, item.zexch || 0, item.partq],
      })),
    [debtsToRender],
  );

  const Header = useMemo(
    () => <TableItem id={'-1'} isHeader={true} items={debtsTableColumns} />,
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
    ({ item }: any) => <TableItem id={item.id} status={item.status} items={item.data} />,
    [],
  );
  const keyExtractor = useCallback((item: any) => item.id, []);
  const onEndReached = useCallback(() => {
    dispatch(
      getNextDebts({
        pagination: { offset: debtsToRender.length, limit: 100 },
        filters: { search: searchValue },
      }),
    );
  }, [debtsToRender.length, dispatch, searchValue]);

  const getItemCount = useCallback(() => tableData.length, [tableData.length]);
  const getItem = useCallback((_: any, index: number) => tableData[index], [tableData]);

  useScrollToTop(list);
  return !loaderDebtsList ? (
    <View style={styles.base}>
      <View style={styles.filterSection}>
        <TextInput
          placeholder="Որոնել"
          icon={SearchIcon}
          onChangeText={setSearchedValue}
          value={searchValue}
          wrapperStyle={styles.searchInput}
        />
      </View>
      <VirtualizedList
        ref={list}
        data={[]}
        style={styles.list}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
        ListFooterComponent={
          debtsList.length !== debtsToRender.length && debtsToRender.length >= 100
            ? Footer
            : undefined
        }
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={null}
        maxToRenderPerBatch={12}
        initialNumToRender={2}
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
  list: {
    // marginBottom: verticalScale(100),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

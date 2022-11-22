import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import SearchIcon from '../../assets/images/search.png';
import { FilterListItem, ProductListItem, TextInput } from '../../components';
import { SingleProduct } from '../../components/SingleProduct';
import { InAppMessage } from '../../components/Toast';
import { IFilterItem, IProduct } from '../../models/product';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getLoaderProducts,
  getProductsFilters,
  getProductsSelector,
} from '../../store/product/selectors';
import { getProducts, getProductsType } from '../../store/product/thunks';
import { WINDOW_WIDTH } from '../../utils/constants';
import { useDebounce } from '../../utils/debaunce';
import { divideArrayToChunks } from '../../utils/helpers';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

const ITEMS_PER_PAGE = 12;
const itemWidth = WINDOW_WIDTH - horizontalScale(60) * 2;

export const Products = () => {
  const list = useRef<FlatList>(null);
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProductsSelector);
  const filters = useAppSelector(getProductsFilters);
  const loading = useAppSelector(getLoaderProducts);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<IFilterItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<IProduct | null>(null);
  const [searchValue, setSearchedValue] = useState<string>('');
  const debText = useDebounce(searchValue, 500);

  useEffect(() => {
    if (products?.length === 0) {
      dispatch(getProducts());
      dispatch(getProductsType());
    }
  }, [dispatch, products?.length]);

  const itemsToRender = useMemo(() => {
    let renderedData = products;

    if (selectedFilter) {
      renderedData = products.filter(item => item.categories_id === selectedFilter.categories_id);
    }

    renderedData = renderedData.filter(item =>
      item.pxumb_name.toLowerCase().includes(debText.toLowerCase()),
    );

    return divideArrayToChunks(renderedData, ITEMS_PER_PAGE);
  }, [debText, products, selectedFilter]);

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPos = event.nativeEvent.contentOffset.x;
    const current = Math.floor(xPos / totalWidth);
    setScrollPosition(current);
  }, []);

  const onDotPress = useCallback((index: number) => {
    list.current?.scrollToOffset({ animated: true, offset: index * itemWidth });
    setScrollPosition(index);
  }, []);

  const renderFilterItem = useCallback(
    ({ item }: { item: IFilterItem }) => (
      <FilterListItem
        item={item}
        onItemSelect={setSelectedFilter}
        isSelected={selectedFilter?.categories_id === item.categories_id}
      />
    ),
    [selectedFilter?.categories_id],
  );

  const filterSeparator = useCallback(() => <View style={{ width: horizontalScale(30) }} />, []);
  const renderProductItem = useCallback(
    ({ item }: { item: IProduct[] }) => (
      <ProductListItem itemWidth={itemWidth} items={item} onSelect={setSelectedItem} />
    ),
    [],
  );
  const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);
  const getItemCount = useCallback(() => itemsToRender.length, [itemsToRender.length]);
  const getItem = useCallback((_: any, index: number) => itemsToRender[index], [itemsToRender]);
  const onRequestClose = useCallback(() => setSelectedItem(null), []);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.background} />
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={moderateScale(70)} color={'#01276e'} />
          </View>
        ) : (
          <View style={styles.base}>
            <FlatList
              contentContainerStyle={{
                marginBottom: verticalScale(10),
                height: verticalScale(48),
              }}
              data={filters}
              renderItem={renderFilterItem}
              ItemSeparatorComponent={filterSeparator}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              keyboardShouldPersistTaps="handled"
            />
            <TextInput
              placeholder="Որոնել"
              icon={SearchIcon}
              onChangeText={setSearchedValue}
              value={searchValue}
              wrapperStyle={styles.searchInput}
            />
            <VirtualizedList
              ref={list}
              data={[]}
              getItemCount={getItemCount}
              getItem={getItem}
              keyExtractor={keyExtractor}
              horizontal={true}
              style={{ height: '100%' }}
              contentContainerStyle={{ alignItems: 'center' }}
              showsHorizontalScrollIndicator={false}
              renderItem={renderProductItem}
              onMomentumScrollEnd={onScrollEnd}
              snapToInterval={itemWidth}
              decelerationRate={'fast'}
              pagingEnabled={true}
              maxToRenderPerBatch={12}
              initialNumToRender={2}
            />
            <View style={styles.pagination}>
              {Array(itemsToRender.length)
                .fill(0)
                .map((_, index) => (
                  <Pressable
                    key={index.toString()}
                    hitSlop={10}
                    style={[
                      styles.dot,
                      !index && styles.firstDot,
                      index === scrollPosition && styles.selected,
                    ]}
                    onPress={() => onDotPress(index)}
                  />
                ))}
            </View>
          </View>
        )}
      </View>

      <Modal
        visible={!!selectedItem}
        onRequestClose={onRequestClose}
        transparent={true}
        animationType="fade">
        {!!selectedItem && <SingleProduct product={selectedItem} onClose={onRequestClose} />}
        <InAppMessage />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    backgroundColor: 'red',
    width: horizontalScale(400),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  searchInput: {
    alignSelf: 'flex-start',
    minHeight: verticalScale(40),
    marginTop: verticalScale(12),
    width: horizontalScale(480),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(60),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(100),
  },
  listContainer: {
    justifyContent: 'space-between',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(40),
  },
  dot: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    marginLeft: verticalScale(12),
    backgroundColor: 'rgba(7, 44, 125, 0.12)',
  },
  selected: {
    backgroundColor: '#072C7D',
  },
  firstDot: {
    marginLeft: 0,
  },
});

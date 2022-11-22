import React, { FC, memo, useCallback, useMemo } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import CloseIcon from '../assets/images/close.svg';
import { RemoveBasketItemFetchedData } from '../models/orders';
import { IBasketProduct } from '../models/product';
import { useAppDispatch, useAppSelector } from '../store';
import { getActiveOrderId, getBasket, getSelectedCustomerID } from '../store/basket/selectors';
import { removeFromBasket } from '../store/basket/thunks';
import { getProductsSelector } from '../store/product/selectors';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

interface Props {
  typeId: number;
  item: IBasketProduct;
}

const BasketListItem: FC<Props> = ({ item, typeId }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProductsSelector);
  const basket = useAppSelector(getBasket);
  const selectedCustomerId = useAppSelector(getSelectedCustomerID);
  const activeOrderId = useAppSelector(getActiveOrderId);
  const onDeleteItem = useCallback(() => {
    const basketItem = basket.find(i => i.id === typeId);

    const data: Array<RemoveBasketItemFetchedData> = [
      {
        id: typeId,
        sdate: new Date(),
        gycod: selectedCustomerId,
        aah: basketItem?.aah!,
        apr_cank: [
          {
            lid: -item.lid,
          },
        ],
      },
    ];

    dispatch(removeFromBasket({ body: data, orderId: activeOrderId! }));
  }, [activeOrderId, basket, dispatch, item.lid, selectedCustomerId, typeId]);

  const product = useMemo(
    () => products.find(i => i.products_id === item.products_id),
    [item.products_id, products],
  );

  return (
    <Pressable style={styles.base}>
      <Image
        style={styles.image}
        source={{ uri: product?.products_image }}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.name} fontSize={32} numberOfLines={1}>
            {product?.pxumb_name}
          </Text>
          <TouchableOpacity
            onPress={onDeleteItem}
            hitSlop={{
              top: verticalScale(10),
              left: verticalScale(10),
              right: verticalScale(10),
              bottom: verticalScale(20),
            }}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View style={styles.count}>
            <Text fontSize={24}>
              Չափսը ՝ {item.psize} {item.miavor}
            </Text>
            <View style={styles.priceItem}>
              <Text fontSize={20} style={styles.priceType}>
                Զեղչված գին՝
              </Text>
              <View style={[styles.priceContainer, styles.saleContainer]}>
                <Text fontSize={20} style={styles.discountText}>
                  {((item.zgin || 0) * (item.qanak || 1)).toFixed(2)} դրամ
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.count}>
            <Text fontSize={24}>Քանակը ՝ {item.qanak}</Text>
            <Text fontSize={16}>
              {item.qanak} x {(item.gin || 0).toString().split('.0000')}
            </Text>
            <View style={styles.priceItem}>
              <Text fontSize={20} style={styles.priceType}>
                Գինը՝
              </Text>
              <View style={styles.priceContainer}>
                <Text fontSize={28} style={styles.priceText}>
                  {item.gumar} դրամ
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'row',
    height: moderateScale(250),
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(24),
    paddingLeft: horizontalScale(64),
  },
  image: {
    flex: 1,
    height: '100%',
  },
  content: {
    flex: 3,
    paddingLeft: horizontalScale(64),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: horizontalScale(24),
  },
  name: { color: '#072C7D', fontWeight: '700' },
  info: {
    flex: 2,
    height: '100%',
    justifyContent: 'space-evenly',
  },
  count: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  priceContainer: {
    paddingHorizontal: horizontalScale(50),
    paddingVertical: verticalScale(10),
    backgroundColor: '#d3d8e6',
    borderBottomLeftRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
  },
  saleContainer: {
    backgroundColor: '#ffdcdc',
  },
  priceType: {
    color: '#1c1c1c',
    fontWeight: '600',
    paddingRight: horizontalScale(60),
  },
  priceText: {
    color: '#00276E',
    fontWeight: '700',
  },
  discountText: {
    color: 'red',
    fontWeight: '700',
  },
});

export default memo(BasketListItem);

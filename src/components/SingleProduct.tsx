import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import APIServices from '../api/APIServices';
import { default as BasketIcon } from '../assets/images/basket.png';
import { default as Close } from '../assets/images/close.svg';
import { SendOrderListFetchedData } from '../models/orders';
import { IProduct, IProductDetails } from '../models/product';
import { useAppDispatch, useAppSelector } from '../store';
import { getPermissions } from '../store/auth/selectors';
import { getActiveOrderId, getBasket, getSelectedCustomerID } from '../store/basket/selectors';
import { addNewItemToBasket } from '../store/basket/thunks';
import { getOrdersSelector } from '../store/orders/selectors';
import { createOrderItem } from '../store/orders/slice';
import { getProductsTypesSelector } from '../store/product/selectors';
import { ERROR_STANDARD_MESSAGE } from '../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Counter from './Counter';
import DropDown from './DropDown';
import ProductCheckBox from './ProductsCheckBox';
import Text from './Text';

interface Props {
  onClose: () => void;
  product: IProduct;
}

export const SingleProduct: FC<Props> = ({ onClose, product }) => {
  const dispatch = useAppDispatch();
  const selectedCustomerId = useAppSelector(getSelectedCustomerID);
  const productTypes = useAppSelector(getProductsTypesSelector);
  const permissions = useAppSelector(getPermissions);
  const activeOrderId = useAppSelector(getActiveOrderId);
  const basket = useAppSelector(getBasket);
  const orders = useAppSelector(getOrdersSelector);
  const [productSize, setProductSize] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>('Ոչ');
  const [productInfo, setProductInfo] = useState<IProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      if (productSize) {
        setIsLoading(true);
        await APIServices.getProductsInfo(selectedCustomerId, productSize, product.products_id)
          .then(async res => {
            const data = await res.json();
            setProductInfo(data[0] || null);
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: `Չհաջողվեց ստանալ ապրանքի արժեքը։ ${ERROR_STANDARD_MESSAGE}`,
            });
          });
        setIsLoading(false);
      }
    })();
  }, [product.products_id, productSize, selectedCustomerId]);

  const addProductPermission = useMemo(
    () => permissions && permissions.includes('dit'),
    [permissions],
  );

  const availableTypes = useMemo(() => {
    const defaultTypes = ['Այո', 'Ոչ'];
    productTypes.forEach(type => {
      if (type.cank) {
        const cank = type.cank.split(',');
        if (productInfo?.fCODE && cank.includes(productInfo.fCODE)) {
          defaultTypes.push(type.typ);
        }
      }
    });
    return defaultTypes;
  }, [productInfo?.fCODE, productTypes]);

  const sizes = useMemo(
    () => product.sizes.split(',').map(i => ({ label: i, value: i })),
    [product.sizes],
  );

  const canSubmit = useMemo(
    () => !!(productSize && productInfo?.gin && !addButtonDisabled),
    [addButtonDisabled, productInfo?.gin, productSize],
  );

  const hasOrderWithSelectedOrderId = useMemo(
    () => !!orders.find(order => order.id === activeOrderId),
    [activeOrderId, orders],
  );

  const onAdd = useCallback(async () => {
    setAddButtonDisabled(true);
    if (!hasOrderWithSelectedOrderId && activeOrderId) {
      dispatch(createOrderItem(activeOrderId));
    }

    const typeIndex = basket.findIndex(i => i.aah === selectedType);

    const data: Array<SendOrderListFetchedData> = [
      {
        id: typeIndex < 0 ? 0 : basket[typeIndex].id,
        sdate: new Date(),
        gycod: selectedCustomerId,
        aah: selectedType,
        spdit: '',
        apr_cank: [
          {
            aprcod: productInfo?.fCODE || '',
            lid: 0,
            qanak: count,
            marka: productInfo?.marka || '',
          },
        ],
      },
    ];
    if (activeOrderId) {
      await dispatch(
        addNewItemToBasket({
          productId: product.products_id,
          productSize,
          body: data,
          orderId: activeOrderId,
        }),
      );
    }

    setAddButtonDisabled(false);
  }, [
    hasOrderWithSelectedOrderId,
    activeOrderId,
    basket,
    selectedCustomerId,
    selectedType,
    productInfo?.fCODE,
    productInfo?.marka,
    count,
    dispatch,
    product.products_id,
    productSize,
  ]);

  const discountedPrice = useMemo(() => {
    const sliced = productInfo && productInfo?.zexch?.split(' ');

    if (sliced) {
      return Number(productInfo?.gin) - (Number(productInfo?.gin) * Number(sliced[0])) / 100;
    }
    return 0;
  }, [productInfo]);

  const onProductItemChange = useCallback((value: any) => setProductSize(value.value), []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.modal}>
      <KeyboardAvoidingView style={styles.base} behavior="height">
        <Image style={styles.image} source={{ uri: product.products_image }} resizeMode="contain" />
        <View style={styles.content}>
          {isLoading && (
            <View style={[StyleSheet.absoluteFill, styles.loading]}>
              <ActivityIndicator size={moderateScale(70)} color={'#01276e'} />
            </View>
          )}
          <Text style={styles.title} fontSize={48}>
            {product.pxumb_name.trim()}
          </Text>
          <View style={styles.sectionContainer}>
            <View style={styles.section1}>
              <View style={styles.sizeContainer}>
                <View style={styles.sizeItem}>
                  <Text style={styles.sizeText} fontSize={24}>
                    Ընտրել չափսը`
                  </Text>
                  <DropDown
                    items={sizes}
                    onChange={onProductItemChange}
                    placeholder={'Ընտրել'}
                    size={130}
                  />
                </View>
                <View style={styles.sizeItem}>
                  {!addProductPermission && (
                    <>
                      <Text style={styles.sizeText} fontSize={24}>
                        Քանակ՝
                      </Text>
                      <Counter count={count} onChange={setCount} />
                    </>
                  )}
                </View>
              </View>
              <View>
                <Text fontSize={24} style={styles.ballanceText}>
                  Մնացորդ՝{'   '}
                  {productInfo?.mnacord ? Number(productInfo?.mnacord).toFixed(2) : '0'}
                </Text>
                <Text fontSize={24} style={[styles.ballanceText, styles.lastText]}>
                  Չձևակերպված մնացորդ՝{'   '}{' '}
                  {productInfo?.chdzmnac ? Number(productInfo?.chdzmnac).toFixed(2) : '0'}
                </Text>
              </View>
              {!addProductPermission && (
                <View style={styles.types}>
                  {availableTypes?.map((type: string, index) => (
                    <ProductCheckBox
                      key={type}
                      type={type}
                      isSelected={type === selectedType}
                      onChange={setSelectedType}
                      isFirst={index === 0}
                    />
                  ))}
                </View>
              )}
            </View>
            <View style={styles.section2}>
              {!addProductPermission && (
                <TouchableOpacity
                  disabled={!canSubmit}
                  onPress={onAdd}
                  style={[styles.submit, !canSubmit && styles.disabled]}>
                  <Text fontSize={24} style={styles.submitText}>
                    Ավելացնել զամբյուղ
                  </Text>
                  <Image source={BasketIcon} />
                </TouchableOpacity>
              )}
              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle} fontSize={24}>
                  Զեղչված գինը՝
                </Text>
                <View style={[styles.price, styles.discount]}>
                  <Text fontSize={36} style={styles.priceText}>
                    {(count * discountedPrice).toFixed()}{' '}
                    <Text fontSize={28} style={styles.priceText}>
                      դրամ
                    </Text>
                  </Text>
                </View>
                <Text style={[styles.priceTitle, styles.realPriceTitle]} fontSize={28}>
                  Գինը՝
                </Text>
                <View style={styles.price}>
                  <Text fontSize={moderateScale(48)} style={styles.priceText}>
                    {productInfo?.gin
                      ? (count * Number(productInfo.gin)).toString().split('.0000')
                      : 0}{' '}
                    <Text fontSize={moderateScale(36)} style={styles.priceText}>
                      դրամ
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <Close />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingHorizontal: horizontalScale(36),
    paddingTop: verticalScale(92),
    paddingBottom: verticalScale(100),
    backgroundColor: 'rgba(0,0,0,0.67)',
  },
  close: {
    position: 'absolute',
    top: verticalScale(72),
    right: horizontalScale(12),
    height: moderateScale(72),
    width: moderateScale(72),
    borderRadius: moderateScale(18),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  base: {
    // flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 16.0,
    elevation: 24,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 540,
    backgroundColor: '#ffffff',
  },
  content: {
    height: 480,
    paddingTop: verticalScale(12),
    paddingLeft: horizontalScale(120),
  },
  loading: {
    backgroundColor: '#d3d8e6',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11111,
  },
  title: {
    color: '#072C7D',
    fontWeight: '700',
  },

  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: verticalScale(24),
  },
  section1: {
    width: '60%',
    justifyContent: 'space-between',
  },
  section2: {
    width: '40%',
    flexDirection: 'column-reverse',
    paddingRight: horizontalScale(24),
  },

  sizeContainer: {
    flexDirection: 'row',
    paddingTop: verticalScale(20),
  },

  sizeItem: {
    flex: 1,
    alignItems: 'flex-start',
  },

  sizeText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#161616',
    paddingBottom: verticalScale(20),
  },
  ballanceText: {
    color: '#161616',
    fontWeight: 'bold',
    paddingTop: verticalScale(18),
  },
  lastText: {
    paddingBottom: verticalScale(18),
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: moderateScale(64),
  },
  submit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0f3b',
    paddingHorizontal: horizontalScale(48),
    paddingVertical: verticalScale(18),
    borderRadius: moderateScale(40),
  },
  disabled: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  priceContainer: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: verticalScale(40),
    minWidth: moderateScale(300),
    minHeight: moderateScale(150),
  },
  priceTitle: {
    width: '100%',
    color: '#000000',
    fontWeight: '600',
    paddingBottom: verticalScale(12),
  },
  realPriceTitle: {
    paddingTop: verticalScale(20),
    color: '#000000',
  },
  price: {
    borderBottomLeftRadius: moderateScale(48),
    borderTopLeftRadius: moderateScale(48),
    backgroundColor: '#01276e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(100),
    height: verticalScale(48),
  },
  discount: {
    paddingHorizontal: horizontalScale(80),
    backgroundColor: '#ff0f3b',
  },
  priceText: {
    color: '#ffffff',
    fontWeight: '600',
    paddingRight: horizontalScale(40),
    textAlign: 'center',
  },
});

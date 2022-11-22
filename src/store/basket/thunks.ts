import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import APIServices from '../../api/APIServices';
import {
  RemoveBasketItemFetchedData,
  SendOrderListFetchedData,
  UpdateBasketFetchedData,
} from '../../models/orders';
import { IBasketItem, IBasketProduct } from '../../models/product';
import { ERROR_STANDARD_MESSAGE } from '../../utils/constants';
import { addOrder, removeItemFromOrder, removeOrder, updateOrder } from '../orders/slice';

export const getManagersList = createAsyncThunk(
  'basket/getManagers',
  async () =>
    await APIServices.getManagerList().then(async res => {
      const data = await res.json();
      return Promise.resolve(data);
    }),
);

export const getCustomersList = createAsyncThunk(
  'basket/getCustomers',
  async () =>
    await APIServices.getCustomerList()
      .then(async res => {
        const data = await res.json();
        return Promise.resolve(data);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: `Չհաջողվեց բեռնել գործընկերների ցանկը։ ${ERROR_STANDARD_MESSAGE}`,
        });
        return Promise.reject();
      }),
);

export const addNewItemToBasket = createAsyncThunk(
  'basket/addNewItemToBasket',
  async (
    data: {
      productId: string;
      productSize: string;
      body: Array<SendOrderListFetchedData>;
      orderId: number;
    },
    { dispatch },
  ) =>
    await APIServices.sendOrderList(data.body)
      .then(async res => {
        const index = res[0].apr_cank.length - 1;

        const productWithProductId: IBasketProduct = {
          ...res[0].apr_cank[index],
          psize: res[0].apr_cank[index].psize || data.productSize,
          products_id: data.productId,
        };

        const item: IBasketItem = {
          ...res[0],
          apr_cank: [productWithProductId],
        };

        dispatch(addOrder({ id: data.orderId, data: item }));

        return Promise.resolve(item);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: `Չհաջողվեց ավելացնել ապրանքը զամբյուղում։ ${ERROR_STANDARD_MESSAGE}`,
        });
        return Promise.reject();
      }),
);

export const removeFromBasket = createAsyncThunk(
  'basket/removeFromBasket',
  async (
    data: {
      body: Array<RemoveBasketItemFetchedData>;
      orderId: number;
    },
    { dispatch },
  ) =>
    await APIServices.sendOrderList(data.body)
      .then(res => {
        dispatch(
          removeItemFromOrder({
            orderId: data.orderId,
            data: res[0],
            id: data.body[0].id,
            lid: data.body[0].apr_cank[0].lid,
          }),
        );

        return res[0];
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: `Չհաջողվեց հեռացնել  պատվերը զամբյուղից ցանկը։ ${ERROR_STANDARD_MESSAGE}`,
        });
        return Promise.reject();
      }),
);

export const updateOrderList = createAsyncThunk(
  'basket/updateOrderList',
  async (data: { body: Array<UpdateBasketFetchedData>; orderId: number }, { dispatch }) =>
    await APIServices.sendOrderList(data.body)
      .then(() => {
        dispatch(
          updateOrder({
            id: data.orderId,
            data: { men: Number(data.body[0].men), spdit: data.body[0].spdit },
          }),
        );
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: `Չհաջողվեց հաստատել պատվերը։ ${ERROR_STANDARD_MESSAGE}`,
        });
      }),
);

export const confirmOrder = createAsyncThunk(
  'basket/confirmOrder',
  async (data: { patCodes: string; orderId: number }, { dispatch }) =>
    await APIServices.confirmOrder(data.patCodes)
      .then(() => {
        dispatch(removeOrder(data.orderId));
        return Promise.resolve();
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: `Չհաջողվեց հաստատել պատվերը։ ${ERROR_STANDARD_MESSAGE}`,
        });
      }),
);

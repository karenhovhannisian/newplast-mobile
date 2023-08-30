import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBasketItem } from '../../models/product';
import { deleteOrder } from './thunks';

export type INotFinishedOrder = { id: number; data: Array<IBasketItem> };
interface OrdersState {
  orders: Array<INotFinishedOrder>;
}

const initialState: OrdersState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createOrderItem: (state, action: PayloadAction<number>) => {
      state.orders = [{ id: action.payload, data: [] }, ...state.orders];
    },
    addOrder: (state, action: PayloadAction<{ id: number; data: IBasketItem }>) => {
      state.orders = state.orders.map(order => {
        if (order.id === action.payload.id) {
          const data = action.payload.data;
          const index = order.data.findIndex(i => i.aah === data.aah);

          if (!order.data.length || index < 0) {
            return { ...order, data: [...order.data, data] };
          } else {
            const orderData = order.data.map((item, i) =>
              i === index
                ? {
                    ...action.payload.data,
                    ...data,
                    apr_cank: [...item.apr_cank, ...data.apr_cank],
                  }
                : item,
            );
            return { ...order, data: orderData };
          }
        }

        return order;
      });
    },
    removeItemFromOrder: (
      state,
      action: PayloadAction<{ orderId: number; data: IBasketItem; id: number; lid: number }>,
    ) => {
      state.orders = state.orders.map(order => {
        if (order.id === action.payload.orderId) {
          return {
            ...order,
            data: order.data.map(item =>
              item.id === action.payload.id
                ? {
                    ...action.payload.data,
                    apr_cank: item.apr_cank.filter(apr => apr.lid !== Math.abs(action.payload.lid)),
                  }
                : item,
            ),
          };
        }
        return order;
      });
    },
    updateOrder: (
      state,
      action: PayloadAction<{ id: number; data: { men: number; ahasce?: string } }>,
    ) => {
      state.orders = state.orders.map(order => {
        if (order.id === action.payload.id) {
          return { ...order, data: order.data.map(item => ({ ...item, ...action.payload.data })) };
        }
        return order;
      });
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.meta.arg.orderId);
    });
  },
});

export const { createOrderItem, addOrder, removeOrder, removeItemFromOrder, updateOrder } =
  orderSlice.actions;

export default orderSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from '../../models/auth';
import { ICustomer, IManager } from '../../models/busket';
import { IBasketItem } from '../../models/product';
import { INITIAL_ITEMS_PER_PAGE } from '../../utils/constants';
import { limitOffset } from '../../utils/helpers';
import { addNewItemToBasket, getCustomersList, getManagersList, removeFromBasket } from './thunks';

interface BasketState {
  basket: Array<IBasketItem>;
  selectedCustomerID: string;
  activeOrderId: number | null;
  managers: Array<IManager>;
  customers: Array<ICustomer>;
  customersToRender: Array<ICustomer>;
  loadingCustomersRequest: boolean;
  description: string;
}

const initialState: BasketState = {
  basket: [],
  selectedCustomerID: '',
  activeOrderId: null,
  managers: [],
  customers: [],
  customersToRender: [],
  loadingCustomersRequest: false,
  description: '',
};

export const basketSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initializeBasket: (
      state,
      action: PayloadAction<{ activeOrderId: number; basket?: Array<IBasketItem> }>,
    ) => {
      state.activeOrderId = action.payload.activeOrderId;
      state.basket = action.payload.basket || [];
      state.description = '';
    },
    setCustomerId: (state, action: PayloadAction<string>) => {
      state.selectedCustomerID = action.payload;
    },
    addToBasket: (state, action: PayloadAction<IBasketItem>) => {
      const index = state.basket.findIndex(i => i.id === action.payload.id);
      if (index < 0) {
        state.basket = [...state.basket, action.payload];
      } else {
        state.basket = state.basket.map((tab, i) => {
          if (i === index) {
            return { ...tab, apr_cank: [...tab.apr_cank, ...action.payload.apr_cank] };
          }
          return tab;
        });
      }
    },
    removeBasketItem: (state, action: PayloadAction<{ id: number; lid: number }>) => {
      state.basket = state.basket.map(tab =>
        tab.id === action.payload.id
          ? { ...tab, apr_cank: tab.apr_cank.filter(apr => apr.lid !== action.payload.lid) }
          : tab,
      );
    },
    addDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setActiveOrderId: (state, action: PayloadAction<number>) => {
      state.activeOrderId = action.payload;
    },

    getNextCustomer: (
      state,
      action: PayloadAction<{
        pagination: Pagination;
        filters: {
          search?: string;
          region?: string;
        };
      }>,
    ) => {
      const {
        pagination: { offset, limit },
        filters,
      } = action.payload;

      let items = [...state.customers];
      if (Object.entries(filters).length) {
        const { search = '', region = '' } = filters;

        items = state.customers.filter(item => {
          let withOtherFilter = true;
          if (item.aktrg) {
            withOtherFilter = region ? item.aktrg === region : true;
          }
          const bySearchText = item.anun?.toLowerCase().includes(search.toLowerCase());
          return bySearchText && withOtherFilter;
        });
      }

      const lastItems = offset ? [...state.customersToRender] : [];
      const newItems = limitOffset(items, limit, offset);
      state.customersToRender = [...lastItems, ...newItems];
    },
  },
  extraReducers: builder => {
    builder.addCase(getManagersList.fulfilled, (state, action) => {
      state.managers = action.payload;
    });

    builder.addCase(getCustomersList.fulfilled, (state, action) => {
      state.customers = action.payload;
      state.customersToRender = action.payload.slice(0, INITIAL_ITEMS_PER_PAGE);
      state.loadingCustomersRequest = false;
    });
    builder.addCase(getCustomersList.pending, state => {
      state.loadingCustomersRequest = true;
    });
    builder.addCase(getCustomersList.rejected, state => {
      state.loadingCustomersRequest = false;
    });

    builder.addCase(addNewItemToBasket.fulfilled, (state, action: PayloadAction<IBasketItem>) => {
      const index = state.basket.findIndex(i => i.id === action.payload.id);
      if (index < 0) {
        state.basket = [...state.basket, action.payload];
      } else {
        state.basket = state.basket.map((tab, i) =>
          i === index
            ? { ...action.payload, apr_cank: [...tab.apr_cank, ...action.payload.apr_cank] }
            : tab,
        );
      }
    });

    builder.addCase(removeFromBasket.fulfilled, (state, action) => {
      const id = action.meta.arg.body[0].id;
      const lid = action.meta.arg.body[0].apr_cank[0].lid;

      state.basket = state.basket.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...action.payload,
            apr_cank: item.apr_cank.filter(apr => apr.lid !== Math.abs(lid)),
          };
        }
        return item;
      });
    });
  },
});

export const {
  addToBasket,
  getNextCustomer,
  setCustomerId,
  removeBasketItem,
  addDescription,
  setActiveOrderId,
  initializeBasket,
} = basketSlice.actions;

export default basketSlice.reducer;

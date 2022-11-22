import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from '../../models/auth';
import { IOldOrder } from '../../models/orders';
import { INITIAL_ITEMS_PER_PAGE } from '../../utils/constants';
import { isDateFromRange, limitOffset } from '../../utils/helpers';
import { getOldOrders } from './thunks';

interface OldOrdersState {
  loaderOldOrders: boolean;
  oldOrders: Array<IOldOrder>;
  searchedOrders: Array<IOldOrder>;
  ordersToRender: Array<IOldOrder>;
}

const initialState: OldOrdersState = {
  loaderOldOrders: false,
  oldOrders: [],
  searchedOrders: [],
  ordersToRender: [],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getNextOrders: (
      state,
      action: PayloadAction<{
        pagination: Pagination;
        filters: {
          search?: string;
          startDate?: string;
          endDate?: string;
        };
      }>,
    ) => {
      const {
        pagination: { offset, limit },
        filters,
      } = action.payload;

      let items = [...state.oldOrders];

      if (Object.entries(filters).length) {
        const { search = '', startDate, endDate } = filters;
        items = state.oldOrders.filter(item => {
          const bySearchText = item.gyanun?.toLowerCase().includes(search.toLowerCase());
          var pattern = /(\d{2})\/(\d{2})\/(\d{2})/;
          if (item.sdate) {
            const date = new Date(item.sdate.replace(pattern, '20$3-$2-$1'));
            const start = startDate ? new Date(JSON.parse(startDate)).getTime() : undefined;
            const end = endDate ? new Date(JSON.parse(endDate)).getTime() : Date.now();

            return bySearchText && isDateFromRange(date.getTime(), end, start);
          }

          return false;
        });
      }

      const lastItems = offset ? [...state.ordersToRender] : [];
      const newItems = limitOffset(items, limit, offset);
      state.ordersToRender = [...lastItems, ...newItems];
    },
  },
  extraReducers: builder => {
    builder.addCase(getOldOrders.fulfilled, (state, action: PayloadAction<Array<IOldOrder>>) => {
      state.loaderOldOrders = false;
      state.oldOrders = action.payload;
      state.ordersToRender = limitOffset(action.payload, INITIAL_ITEMS_PER_PAGE, 0);
    });
    builder.addCase(getOldOrders.pending, state => {
      state.loaderOldOrders = true;
    });
    builder.addCase(getOldOrders.rejected, state => {
      state.loaderOldOrders = false;
    });
  },
});

export const { getNextOrders } = ordersSlice.actions;

export default ordersSlice.reducer;

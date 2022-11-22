import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from '../../models/auth';
import { IDebt } from '../../models/orders';
import { INITIAL_ITEMS_PER_PAGE } from '../../utils/constants';
import { limitOffset } from '../../utils/helpers';
import { getDebtList } from './thunks';

interface DebtsState {
  loaderDebtList: boolean;
  debtList: Array<IDebt>;
  debtsToRender: Array<IDebt>;
}

const initialState: DebtsState = {
  loaderDebtList: false,
  debtList: [],
  debtsToRender: [],
};

export const ordersSlice = createSlice({
  name: 'debts',
  initialState,
  reducers: {
    getNextDebts: (
      state,
      action: PayloadAction<{
        pagination: Pagination;
        filters: {
          search?: string;
        };
      }>,
    ) => {
      const {
        pagination: { offset, limit },
        filters,
      } = action.payload;

      let items = [...state.debtList];

      const { search = '' } = filters;
      items = state.debtList.filter(item => {
        const bySearchText = item.anun?.toLowerCase().includes(search.toLowerCase());

        return bySearchText;
      });

      const lastItems = offset ? [...state.debtsToRender] : [];
      const newItems = limitOffset(items, limit, offset);
      state.debtsToRender = [...lastItems, ...newItems];
    },
  },
  extraReducers: builder => {
    builder.addCase(getDebtList.fulfilled, (state, action: any) => {
      state.loaderDebtList = false;
      state.debtList = action.payload;
      state.debtsToRender = action.payload.slice(0, INITIAL_ITEMS_PER_PAGE);
    });
    builder.addCase(getDebtList.pending, state => {
      state.loaderDebtList = true;
    });
    builder.addCase(getDebtList.rejected, state => {
      state.loaderDebtList = false;
    });
  },
});

export const { getNextDebts } = ordersSlice.actions;

export default ordersSlice.reducer;

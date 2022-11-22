import { RootState } from '..';

export const getOrdersSelector = (state: RootState) => state.orders.orders;

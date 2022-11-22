import { RootState } from '..';

export const getLoaderOldOrders = (state: RootState) => state.oldOrders.loaderOldOrders;
export const getOldOrdersSelector = (state: RootState) => state.oldOrders.oldOrders;
export const getLoaderOldOrdersWithPagination = (state: RootState) =>
  state.oldOrders.ordersToRender;

import { RootState } from '..';

export const getBasket = (state: RootState) => state.basket.basket;
export const getManagers = (state: RootState) => state.basket.managers;
export const getCustomers = (state: RootState) => state.basket.customers;
export const getCustomersToRender = (state: RootState) => state.basket.customersToRender;
export const getCustomersRequestLoading = (state: RootState) =>
  state.basket.loadingCustomersRequest;
export const getDescription = (state: RootState) => state.basket.description;
export const getSelectedCustomerID = (state: RootState) => state.basket.selectedCustomerID;
export const getActiveOrderId = (state: RootState) => state.basket.activeOrderId;

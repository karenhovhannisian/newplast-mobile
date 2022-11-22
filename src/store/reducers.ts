import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth/slice';
import BasketReducer from './basket/slice';
import DebtsReducer from './debts/slice';
import OldOrdersReducer from './oldOrders/slice';
import OrderReducer from './orders/slice';
import ProductReducer from './product/slice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  oldOrders: OldOrdersReducer,
  debts: DebtsReducer,
  basket: BasketReducer,
  orders: OrderReducer,
});

export default rootReducer;

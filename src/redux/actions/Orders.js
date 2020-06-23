import MakeActionCreator from '../../helpers/utilities/MakeActionCreator';

export const GET_OLD_ORDERS = 'GET_OLD_ORDERS';
export const getOldOrders = MakeActionCreator(GET_OLD_ORDERS, 'defaultState');
export const GET_OLD_ORDERS_SUCCESS = 'GET_OLD_ORDERS_SUCCESS';
export const getOldOrdersSuccess = MakeActionCreator(
  GET_OLD_ORDERS_SUCCESS,
  'oldOrders',
);

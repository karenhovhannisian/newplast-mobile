import MakeActionCreator from '../../helpers/utilities/MakeActionCreator';

export {
  ATTEMPT_SIGN_IN,
  attemptSignIn,
  SIGN_IN_SUCCESS,
  signInSuccess,
  SIGN_IN_FAIL,
  signInFail,
  ATTEMPT_LOG_OUT,
  attemptLogOut,
  attemptLogOutCancel,
  ATTEMPT_LOG_OUT_CANCEL,
  ATTEMPT_LOG_OUT_SUCCESS,
  attemptLogOutSuccess,
} from './signIn';

export {
  GET_MANAGER_LIST,
  GET_MANAGER_LIST_SUCCESS,
  getManagerList,
  getManagerListSuccess,
  GET_CUSTOMER_LIST,
  GET_CUSTOMER_LIST_SUCCESS,
  getCustomerList,
  getCustomerListSuccess,
  SEND_ORDER_LIST,
  sendOrderList,
  SEND_ORDER_LIST_SUCCESS,
  sendOrderListSuccess,
  CONFIRM_ORDER,
  CONFIRM_ORDER_SUCCESS,
  confirmOrder,
  confirmOrderSuccess,
  CLEAR_ORDER_DATA,
  clearOrderData,
} from './basket';

export {
  GET_OLD_ORDERS,
  GET_OLD_ORDERS_SUCCESS,
  getOldOrders,
  getOldOrdersSuccess,
} from './Orders';

export {
  GET_DEBT_LIST,
  getDebtList,
  GET_DEBT_LIST_SUCCESS,
  getDebtListSuccess,
} from './debt';

export {
  GET_PRODUCTS,
  getProducts,
  GET_PRODUCTS_SUCCESS,
  getProductsSuccess,
  GET_BALANCE,
  GET_BALANCE_SUCCESS,
  getBalance,
  getBalanceSuccess,
  // AD_PRODUCTS,
  AD_PRODUCTS_SUCCESS,
  adProducts,
  adProductsSuccess,
  GET_PRICE,
  GET_PRICE_SUCCESS,
  getPrice,
  getPriceSuccess,
  DELETE_SELECTED_PRODUCT,
  deleteSelectedProduct,
  CLEAR_SELECTED_PRODUCT,
  clearSelectedProduct,
  GET_PRODUCTS_TYPE,
  GET_PRODUCTS_TYPE_SUCCESS,
  getProductsType,
  getProductsTypeSuccess,
} from './products';

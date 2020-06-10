import {
  ATTEMPT_LOG_OUT,
  CLEAR_ORDER_DATA,
  CONFIRM_ORDER_SUCCESS,
  GET_CUSTOMER_LIST_SUCCESS,
  GET_MANAGER_LIST_SUCCESS,
  SEND_ORDER_LIST_SUCCESS,
} from '../actions';

const defaultState = {
  managerList: null,
  customerList: null,
  orderDataSuccess: null,
  confirmOrderSuccess: null,
};

const BasketReducer = (state = defaultState, action) => {
  const {type} = action;
  switch (type) {
    case GET_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        managerList: action.managerList,
      };
    case SEND_ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderDataSuccess: action.orderDataSuccess,
      };
    case GET_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customerList: action.customerList,
      };
    case CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        confirmOrderSuccess: action.confirmOrderSuccess,
      };
    case CLEAR_ORDER_DATA:
      return {
        ...state,
        confirmOrderSuccess: null,
        orderDataSuccess: null,
      };
    case ATTEMPT_LOG_OUT:
      return {
        ...state,
        managerList: null,
        customerList: null,
        orderDataSuccess: null,
        confirmOrderSuccess: null,
      };
    default:
      return state;
  }
};
export default BasketReducer;

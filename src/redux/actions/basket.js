import MakeActionCreator from "../../helpers/utilities/MakeActionCreator";

export const GET_MANAGER_LIST = "GET_MANAGER_LIST";
export const getManagerList = MakeActionCreator(GET_MANAGER_LIST);
export const GET_MANAGER_LIST_SUCCESS = "GET_MANAGER_LIST_SUCCESS";
export const getManagerListSuccess = MakeActionCreator(GET_MANAGER_LIST_SUCCESS, 'managerList'  );


export const GET_CUSTOMER_LIST = "GET_CUSTOMER_LIST";
export const getCustomerList = MakeActionCreator(GET_CUSTOMER_LIST);
export const GET_CUSTOMER_LIST_SUCCESS = "GET_CUSTOMER_LIST_SUCCESS";
export const getCustomerListSuccess = MakeActionCreator(GET_CUSTOMER_LIST_SUCCESS, 'customerList'  );



export const SEND_ORDER_LIST = "SEND_ORDER_LIST";
export const sendOrderList = MakeActionCreator(SEND_ORDER_LIST, 'data');
export const SEND_ORDER_LIST_SUCCESS = "SEND_ORDER_LIST_SUCCESS";
export const sendOrderListSuccess = MakeActionCreator(SEND_ORDER_LIST_SUCCESS, 'orderDataSuccess'  );



export const CONFIRM_ORDER = "CONFIRM_ORDER";
export const confirmOrder = MakeActionCreator(CONFIRM_ORDER, 'data');
export const CONFIRM_ORDER_SUCCESS = "CONFIRM_ORDER_SUCCESS";
export const confirmOrderSuccess = MakeActionCreator(CONFIRM_ORDER_SUCCESS, 'confirmOrderSuccess'  );

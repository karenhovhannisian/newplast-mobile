import MakeActionCreator from "../../helpers/utilities/MakeActionCreator";

export const GET_MANAGER_LIST = "GET_MANAGER_LIST";
export const getManagerList = MakeActionCreator(GET_MANAGER_LIST);
export const GET_MANAGER_LIST_SUCCESS = "GET_MANAGER_LIST_SUCCESS";
export const getManagerListSuccess = MakeActionCreator(GET_MANAGER_LIST_SUCCESS, 'managerList'  );


export const GET_CUSTOMER_LIST = "GET_CUSTOMER_LIST";
export const getCustomerList = MakeActionCreator(GET_CUSTOMER_LIST);
export const GET_CUSTOMER_LIST_SUCCESS = "GET_CUSTOMER_LIST_SUCCESS";
export const getCustomerListSuccess = MakeActionCreator(GET_CUSTOMER_LIST_SUCCESS, 'customerList'  );

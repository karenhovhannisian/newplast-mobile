import {GET_CUSTOMER_LIST_SUCCESS, GET_MANAGER_LIST_SUCCESS, SEND_ORDER_LIST_SUCCESS} from "../actions";

const defaultState = {
    managerList: null,
    customerList: null,
    orderDataSuccess: null
};

const BasketReducer = (state = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case  GET_MANAGER_LIST_SUCCESS:
            return {
                ...state,
                managerList: action.managerList
            };
            case  SEND_ORDER_LIST_SUCCESS:
            return {
                ...state,
                orderDataSuccess: action.orderDataSuccess
            };
            case  GET_CUSTOMER_LIST_SUCCESS:
            return {
                ...state,
                customerList: action.customerList
            };
        default:
            return state
    }
};
export default BasketReducer;

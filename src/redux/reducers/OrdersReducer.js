import {ATTEMPT_LOG_OUT, GET_OLD_ORDERS, GET_OLD_ORDERS_SUCCESS} from "../actions";

const defaultState = {
    oldOrders: null,
    loaderOldOrders: false,
};

const OrdersReducer = (state = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case  GET_OLD_ORDERS_SUCCESS:
            return {
                ...state,
                loaderOldOrders: false,
                oldOrders: action.oldOrders
            };
            case  GET_OLD_ORDERS:
            return {
                ...state,
                loaderOldOrders: true,
            };
        case  ATTEMPT_LOG_OUT:
            return {
                ...state,
                oldOrders: null,
                loaderOldOrders: false,
            };
        default:
            return state
    }
};
export default OrdersReducer;

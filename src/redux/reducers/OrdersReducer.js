import {GET_OLD_ORDERS, GET_OLD_ORDERS_SUCCESS} from "../actions";
import cache from "../../Common/Cache";

const defaultState = {
    oldOrders: null,
    loaderOldOrders: false,
};

// cache.getItem("oldOrders", function(err, value){
//     if (value) {
//         defaultState.oldOrders = value
//     }
// });

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
        default:
            return state
    }
};
export default OrdersReducer;

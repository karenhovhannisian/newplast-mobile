import {GET_OLD_ORDERS_SUCCESS} from "../actions";
import cache from "../../Common/Cache";

const defaultState = {
    oldOrders: [],
};

cache.getItem("oldOrders", function(err, value){
    if (value) {
        defaultState.oldOrders = value
    }
});

const OrdersReducer = (state = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case  GET_OLD_ORDERS_SUCCESS:
            return {
                ...state,
                oldOrders: action.oldOrders
            };
        default:
            return state
    }
};
export default OrdersReducer;

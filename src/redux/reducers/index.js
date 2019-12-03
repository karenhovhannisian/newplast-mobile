import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import ProductsReducer from "./ProductsReducer";
import OrdersReducer from "./OrdersReducer";
import BasketReducer from "./BasketReducer";
import DebtReducer from "./DebtReducer";


const reducer: any = combineReducers({
   AuthReducer,
   ProductsReducer,
   OrdersReducer,
   BasketReducer,
   DebtReducer
});

export default reducer;


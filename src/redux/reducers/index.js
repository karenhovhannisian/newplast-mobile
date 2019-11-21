import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import ProductsReducer from "./ProductsReducer";
import OrdersReducer from "./OrdersReducer";


const reducer: any = combineReducers({
   AuthReducer,
   ProductsReducer,
   OrdersReducer
});

export default reducer;


import {
    GET_PRODUCTS_SUCCESS,
    GET_BALANCE_SUCCESS,
    AD_PRODUCTS,
    GET_PRICE_SUCCESS,
    DELETE_SELECTED_PRODUCT
} from "../actions";
import cache from "../../Common/Cache";

const defaultState = {
    loaderProducts: false,
    products: [],
    balance: [],
    selectedProducts: [],
    price: null,
    elIndex: null
};

cache.getItem("hello", function(err, value){
    if (value) {
        defaultState.products = value
    }
});

const ProductsReducer = (state = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case  GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loaderProducts: true,
            };
            case  GET_BALANCE_SUCCESS:
            return {
                ...state,
                balance: action.balance,
            };
            case  GET_PRICE_SUCCESS:
            return {
                ...state,
                price: action.price,
            };
            case  DELETE_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProducts: state.selectedProducts.filter((el) => {
                       return  (el.id !== action.elIndex) ||  (el.size !== action.size)
                })
            };
        case  AD_PRODUCTS:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, action.product],
            };
        default:
            return state
    }
};
export default ProductsReducer;

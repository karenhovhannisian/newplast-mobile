import {
    GET_PRODUCTS_SUCCESS,
    GET_BALANCE_SUCCESS,
    AD_PRODUCTS,
    GET_PRICE_SUCCESS,
    DELETE_SELECTED_PRODUCT,
    GET_PRODUCTS, CONFIRM_ORDER_DATA, CLEAR_SELECTED_PRODUCT, GET_PRODUCTS_TYPE_SUCCESS, ATTEMPT_LOG_OUT
} from "../actions";

const defaultState = {
    loaderProducts: false,
    products: null,
    balance: [],
    selectedProducts: [],
    productsType: [],
    price: null,
    elIndex: null
};

const ProductsReducer = (state = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case  GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loaderProducts: false,
                products: action.products,
            };
        case  ATTEMPT_LOG_OUT:
            return {
                ...state,
                loaderProducts: false,
                products: null,
                balance: [],
                selectedProducts: [],
                productsType: [],
                price: null,
                elIndex: null
            };
        case  GET_PRODUCTS_TYPE_SUCCESS:
            return {
                ...state,
                productsType: action.productsType,
            };
        case  GET_PRODUCTS:
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
                    return (el.aprcod !== action.elIndex) || (el.psize !== action.psize) || (el.type !== action.tab)
                })
            };
        case  AD_PRODUCTS:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, action.product],
            };
        case  CLEAR_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProducts: []
            };
        default:
            return state
    }
};
export default ProductsReducer;

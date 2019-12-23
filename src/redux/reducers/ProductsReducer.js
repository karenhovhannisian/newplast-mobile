import {
    GET_PRODUCTS_SUCCESS,
    GET_BALANCE_SUCCESS,
    AD_PRODUCTS,
    GET_PRICE_SUCCESS,
    DELETE_SELECTED_PRODUCT,
    GET_PRODUCTS
} from "../actions";

const defaultState = {
    loaderProducts: false,
    products: null,
    balance: [],
    selectedProducts: [],
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
        default:
            return state
    }
};
export default ProductsReducer;

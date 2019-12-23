import MakeActionCreator from "../../helpers/utilities/MakeActionCreator";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const getProducts = MakeActionCreator(GET_PRODUCTS,  );
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const getProductsSuccess = MakeActionCreator(GET_PRODUCTS_SUCCESS, 'products' );

export const GET_BALANCE = "GET_BALANCE";
export const getBalance = MakeActionCreator(GET_BALANCE);
export const GET_BALANCE_SUCCESS = "GET_BALANCE_SUCCESS";
export const getBalanceSuccess = MakeActionCreator(GET_BALANCE_SUCCESS, 'balance' );

export const AD_PRODUCTS = "AD_PRODUCTS";
export const adProducts = MakeActionCreator(AD_PRODUCTS, 'product' );
export const AD_PRODUCTS_SUCCESS = "AD_PRODUCTS_SUCCESS";
export const adProductsSuccess = MakeActionCreator(AD_PRODUCTS_SUCCESS, 'selectedProducts' );


export const GET_PRICE = "GET_PRICE";
export const getPrice = MakeActionCreator(GET_PRICE,'value', 'productId');
export const GET_PRICE_SUCCESS = "GET_PRICE_SUCCESS";
export const getPriceSuccess = MakeActionCreator(GET_PRICE_SUCCESS, 'price' );


export const DELETE_SELECTED_PRODUCT = "DELETE_SELECTED_PRODUCT";
export const deleteSelectedProduct = MakeActionCreator(DELETE_SELECTED_PRODUCT, 'elIndex', 'psize', 'tab' );

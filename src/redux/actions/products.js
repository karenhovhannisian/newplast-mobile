import MakeActionCreator from '../../helpers/utilities/MakeActionCreator';
// import {AD_PRODUCTS} from '.';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const getProducts = MakeActionCreator(GET_PRODUCTS, 'defaultState');
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const getProductsSuccess = MakeActionCreator(
  GET_PRODUCTS_SUCCESS,
  'products',
);

export const GET_BALANCE = 'GET_BALANCE';
export const getBalance = MakeActionCreator(GET_BALANCE, 'defaultStatus');
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
export const getBalanceSuccess = MakeActionCreator(
  GET_BALANCE_SUCCESS,
  'balance',
);

export const ASDF = 'ASDF';
export const adProducts = value => {
  return {type: ASDF, product: value};
}; //MakeActionCreator(AD_PRODUCTS, 'product');
export const AD_PRODUCTS_SUCCESS = 'AD_PRODUCTS_SUCCESS';
export const adProductsSuccess = MakeActionCreator(
  AD_PRODUCTS_SUCCESS,
  'selectedProducts',
);

export const GET_PRODUCTS_TYPE = 'GET_PRODUCTS_TYPE';
export const getProductsType = MakeActionCreator(
  GET_PRODUCTS_TYPE,
  'defaultState',
  'defaultStatus',
);
export const GET_PRODUCTS_TYPE_SUCCESS = 'GET_PRODUCTS_TYPE_SUCCESS';
export const getProductsTypeSuccess = MakeActionCreator(
  GET_PRODUCTS_TYPE_SUCCESS,
  'productsType',
);

export const GET_PRICE = 'GET_PRICE';
export const getPrice = MakeActionCreator(
  GET_PRICE,
  'value',
  'productId',
  'defaultState',
);
export const GET_PRICE_SUCCESS = 'GET_PRICE_SUCCESS';
export const getPriceSuccess = MakeActionCreator(GET_PRICE_SUCCESS, 'price');

export const DELETE_SELECTED_PRODUCT = 'DELETE_SELECTED_PRODUCT';
export const deleteSelectedProduct = MakeActionCreator(
  DELETE_SELECTED_PRODUCT,
  'elIndex',
  'psize',
  'tab',
);

export const CLEAR_SELECTED_PRODUCT = 'CLEAR_SELECTED_PRODUCT';
export const clearSelectedProduct = MakeActionCreator(CLEAR_SELECTED_PRODUCT);

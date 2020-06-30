import {takeLatest, put, call} from 'redux-saga/effects';
import {
  GET_BALANCE,
  GET_PRICE,
  GET_PRODUCTS,
  GET_PRODUCTS_TYPE,
  getBalanceSuccess,
  getPriceSuccess,
  getProductsSuccess,
  getProductsTypeSuccess,
} from '../actions';
import NewPlastApi from '../../api/Api';

function* getProducts() {
  try {
    const response = yield call(NewPlastApi.getProducts);
    yield put(getProductsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getBalance() {
  try {
    const response = yield call(NewPlastApi.getBalance);

    yield put(getBalanceSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getPrice({value, productId}) {
  try {
    const response = yield call(NewPlastApi.getPriceOfProducts, {
      value,
      productId,
    });
    yield put(getPriceSuccess(response.data[0].gin));
  } catch (err) {
    console.log(err);
  }
}

function* getProductsType() {
  try {
    const response = yield call(NewPlastApi.getProductsType);
    yield put(getProductsTypeSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* sendDataSaga() {
  yield takeLatest(GET_PRODUCTS_TYPE, getProductsType);
  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(GET_BALANCE, getBalance);
  yield takeLatest(GET_PRICE, getPrice);
}

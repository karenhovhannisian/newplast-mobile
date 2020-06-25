import {takeLatest, put, call, fork} from 'redux-saga/effects';
import axios from 'axios';
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
import constants from '../../configs/contsants';
import NewPlastApi from '../../api/Api';

function* getProducts({defaultState}) {
  try {
    const response = yield call(NewPlastApi.getProducts);
    yield put(getProductsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getBalance({defaultState}) {
  const bodyFormData = new FormData();
  bodyFormData.append(
    'sl',
    `j,${defaultState.user},${
      defaultState.pass
    },apr_mnacs, where fSTORAGE='111' and psize='16' and p.products_id='1'`,
  );
  try {
    const options = {
      method: 'POST',
      url: `${constants.apiUrl}`,
      credentials: 'include',
      data: bodyFormData,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = yield call(axios, options);

    yield put(getBalanceSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getPrice({value, productId, defaultState}) {
  const bodyFormData = new FormData();
  bodyFormData.append(
    'sl',
    `j,${defaultState.user},${
      defaultState.pass
    },apr_sgin, where psize=${value} and p.products_id=${productId}`,
  );
  try {
    const options = {
      method: 'POST',
      url: `${constants.apiUrl}`,
      credentials: 'include',
      data: bodyFormData,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = yield call(axios, options);
    yield put(getPriceSuccess(response.data[0].gin));
  } catch (err) {
    console.log(err);
  }
}

function* getProductsType({defaultState}) {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append(
      'sl',
      `j,${defaultState.user},${defaultState.pass},ptype`,
    );
    const options = {
      method: 'POST',
      url: `${constants.apiUrl}`,
      credentials: 'include',
      data: bodyFormData,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = yield call(axios, options);
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

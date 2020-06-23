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
import cache from '../../Common/Cache';
import constants from '../../configs/contsants';

const defaultState = {
  pass: null,
  user: null,
};

// const getAuth = async () => {
//   const defaultState = {
//     pass: null,
//     user: null,
//   };

//   await cache.getItem('user', function(err, value) {
//     defaultState.user = value;
//   });

//   await cache.getItem('login', function(err, value) {
//     defaultState.pass = value;
//   });
//   return defaultState;
// };

// const getUserData = async () => {
//   // await cache.getItem('user', function(err, value) {
//   //   defaultState.user = value;
//   // });
//   defaultState.user = await cache.get('key1');
//   defaultState.pass = await cache.get('key2');
//   // await cache.getItem('login', function(err, value) {
//   //   defaultState.pass = value;
//   // });
// };

cache.getItem('user', function(err, value) {
  defaultState.user = value;
});

cache.getItem('login', function(err, value) {
  defaultState.pass = value;
});

function* getProducts({}) {
  try {
    // const defaultState = yield call(getAuth);
    const bodyFormData = yield new FormData();
    bodyFormData.append(
      'sl',
      `j,${defaultState.user},${defaultState.pass},mxumb`,
    );
    console.log('defaultState', defaultState);
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
    yield put(getProductsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getBalance({}) {
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

function* getPrice({value, productId}) {
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

function* getProductsType({}) {
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

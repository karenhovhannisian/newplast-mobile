import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {
  CONFIRM_ORDER,
  confirmOrderSuccess,
  GET_CUSTOMER_LIST,
  GET_MANAGER_LIST,
  getCustomerListSuccess,
  getManagerListSuccess,
  SEND_ORDER_LIST,
  sendOrderListSuccess,
} from '../actions';

import NewPlastApi from '../../api/Api';

function* getManagerList() {
  try {
    const response = yield call(NewPlastApi.getManagerList);
    yield put(getManagerListSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getCustomerList() {
  try {
    const response = yield call(NewPlastApi.getCustomerList);
    yield put(getCustomerListSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* sendOrderList({data: {data}}) {
  try {
    // console.log('data', data[0][0].apr_cank);
    const response = yield call(NewPlastApi.sendOrderList, {data});
    yield put(sendOrderListSuccess(response.data)); //todo fix this part
  } catch (err) {
    console.log(err);
  }
}
function* confirmOrder({data: {data, defaultState}}) {
  try {
    const response = yield call(NewPlastApi.confirmOrder, {data});
    yield put(confirmOrderSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* sendDataSaga() {
  yield takeLatest(GET_MANAGER_LIST, getManagerList);
  yield takeLatest(GET_CUSTOMER_LIST, getCustomerList);
  yield takeLatest(SEND_ORDER_LIST, sendOrderList);
  yield takeLatest(CONFIRM_ORDER, confirmOrder);
}

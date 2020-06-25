import {takeLatest, put, call} from 'redux-saga/effects';
import {getOldOrdersSuccess, GET_OLD_ORDERS} from '../actions';
import NewPlastApi from '../../api/Api';

function* getOldOrders() {
  try {
    const response = yield call(NewPlastApi.getOldOrders);
    yield put(getOldOrdersSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* sendDataSaga() {
  yield takeLatest(GET_OLD_ORDERS, getOldOrders);
}

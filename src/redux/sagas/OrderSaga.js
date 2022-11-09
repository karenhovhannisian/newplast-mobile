import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {getOldOrdersSuccess, GET_OLD_ORDERS} from '../actions';
import cache from '../../Common/Cache';
import constants from '../../configs/contsants';

const defaultState = {
  pass: null,
  user: null,
};

cache.getItem('user', function(err, value) {
  defaultState.user = value;
});

cache.getItem('login', function(err, value) {
  defaultState.pass = value;
});

function* getOldOrders({}) {
  const bodyFormData = new FormData();
  bodyFormData.append(
    'sl',
    `j,${defaultState.user},${defaultState.pass},patvera,where l.id>0`,
  );
  try {
    const options = {
      method: 'POST',
      url: `${constants.apiUrl}`,
      credentials: 'include',
      data: bodyFormData,
    };
    const response = yield call(axios, options);
    console.log('response.data', response.data);
    yield put(getOldOrdersSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* sendDataSaga() {
  yield takeLatest(GET_OLD_ORDERS, getOldOrders);
}

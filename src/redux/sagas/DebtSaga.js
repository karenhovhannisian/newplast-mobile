import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {GET_DEBT_LIST, getDebtListSuccess} from '../actions';
import cache from '../../Common/Cache';
import constants from '../../configs/contsants';

// const defaultState = {
//   pass: null,
//   user: null,
// };

// cache.getItem('user', function(err, value) {
//   defaultState.user = value;
// });

// cache.getItem('login', function(err, value) {
//   defaultState.pass = value;
// });

function* getDebtList({defaultState}) {
  const bodyFormData = new FormData();
  bodyFormData.append(
    'sl',
    `j,${defaultState.user},${defaultState.pass},gynker`,
  );
  try {
    const options = {
      method: 'POST',
      url: `${constants.apiUrl}`,
      credentials: 'include',
      data: bodyFormData,
    };
    const response = yield call(axios, options);
    // yield put(getDebtListSuccess(response.data.slice(0, 25)));
    yield put(getDebtListSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* sendDataSaga() {
  yield takeLatest(GET_DEBT_LIST, getDebtList);
}

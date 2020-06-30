import {takeLatest, put, call} from 'redux-saga/effects';
import {GET_DEBT_LIST, getDebtListSuccess} from '../actions';

import NewPlastApi from '../../api/Api';

function* getDebtList() {
  try {
    const response = yield call(NewPlastApi.getDebtList);
    // yield put(getDebtListSuccess(response.data.slice(0, 25)));
    yield put(getDebtListSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* sendDataSaga() {
  yield takeLatest(GET_DEBT_LIST, getDebtList);
}

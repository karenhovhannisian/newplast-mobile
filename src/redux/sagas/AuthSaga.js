import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {ATTEMPT_SIGN_IN, signInFail, signInSuccess} from '../actions';
import cache from '../../Common/Cache';
import constants from '../../configs/contsants';
import {AsyncStorage} from 'react-native';

const logInUser = async (pass, User, mnor, perm) => {
  console.log('object', pass, User, mnor, perm);
  await cache.setItem('login', pass, function(err) {});
  await cache.setItem('user', User, function(err) {});
  await cache.setItem('mnor', mnor, function(err) {});
  await cache.setItem('perm', perm, function(err) {});
  return;
};

function* signIn({User, pass}) {
  const bodyFormData = new FormData();
  bodyFormData.append('sl', `j,${User},${pass},perm`);
  try {
    const options = {
      method: 'POST',
      url: `${constants.apiUrl}`,
      credentials: 'include',
      data: bodyFormData,
    };
    const response = yield call(axios, options);
    if (Array.isArray(response.data)) {
      // cache.setItem('login', pass, function(err) {});
      // cache.setItem('user', User, function(err) {});
      // cache.setItem('mnor', response.data[0].mnor, function(err) {});
      // cache.setItem('perm', response.data[0].perm, function(err) {});
      yield call(
        logInUser,
        pass,
        User,
        response.data[0].mnor,
        response.data[0].perm,
      );
      yield put(signInSuccess(response.data));
    } else {
      yield put(signInFail());
    }
  } catch (err) {
    console.log(err);
    yield put(signInFail());
  }
}

export default function* sendDataSaga() {
  yield takeLatest(ATTEMPT_SIGN_IN, signIn);
}

import {takeLatest, put, call} from "redux-saga/effects";
import axios from 'axios';
import {ATTEMPT_SIGN_IN, signInSuccess} from "../actions";
import cache from "../../Common/Cache";


function* signIn({User, pass}) {
    cache.setItem("login", pass, function(err) {});
    cache.setItem("user", User, function(err) {});
    const bodyFormData = new FormData();
    bodyFormData.append('sl', `j,${User},${pass},perm`);
    try {

        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php`,
            credentials: "include",
            data: bodyFormData
        };
        const response = yield call(axios, options);

        yield put(signInSuccess(response));
    } catch (err) {
        console.log(err);
    }
}

export default function* sendDataSaga() {
    yield takeLatest(ATTEMPT_SIGN_IN, signIn);
};

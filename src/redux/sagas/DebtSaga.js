import {takeLatest, put, call} from "redux-saga/effects";
import axios from 'axios';
import {
    GET_DEBT_LIST,
    getDebtListSuccess,
} from "../actions";
import cache from "../../Common/Cache";

const defaultState = {
    pass: null,
    user: null,
};

cache.getItem("user", function (err, value) {
    defaultState.user = value
});


cache.getItem("login", function (err, value) {
    defaultState.pass = value
});

function* getDebtList({}) {
    try {
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,${defaultState.user},${defaultState.pass},gynker`,
            credentials: "include",
        };
        const response = yield call(axios, options);
        yield put(getDebtListSuccess(response.data.slice(0, 25)));
    } catch (err) {
        console.log(err);
    }
}

export default function* sendDataSaga() {
    yield takeLatest(GET_DEBT_LIST, getDebtList);
};



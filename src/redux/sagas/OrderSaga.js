import {takeLatest, put, call} from "redux-saga/effects";
import axios from 'axios';
import { getOldOrdersSuccess,GET_OLD_ORDERS} from "../actions";
import cache from "../../Common/Cache";

const defaultState = {
    pass: null,
    user: null,
};

cache.getItem("user", function(err, value){
    defaultState.user = value
});


cache.getItem("login", function(err, value){
    defaultState.pass = value
});

function* getOldOrders({}) {
    try {
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,${defaultState.user},${defaultState.pass},patvera,where l.id>0`,
            credentials: "include",
        };
        const response = yield call(axios, options);
        // cache.setItem("oldOrders", response.data.slice(0,40), function(err) {});

        yield put(getOldOrdersSuccess(response.data.slice(0,40)));
    } catch (err) {
        console.log(err);
    }
}

export default function* sendDataSaga() {
    yield takeLatest(GET_OLD_ORDERS, getOldOrders);
};
